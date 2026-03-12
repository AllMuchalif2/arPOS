import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 3. Ambil payload dari request body (Sekarang menerima password dari client)
    let body: { registrationId: string; password?: string };
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Format payload tidak valid" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { registrationId, password: clientPassword } = body;

    if (!registrationId) {
      throw new Error("registrationId wajib diisi");
    }

    // 1. Buat client supabase dengan SERVICE ROLE KEY
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // 2. Ambil data registrasi
    const { data: registration, error: regError } = await supabaseAdmin
      .from("tenant_registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (regError || !registration) {
      throw new Error("Data registrasi tidak ditemukan");
    }

    if (registration.status !== "pending") {
      throw new Error("Registrasi ini sudah diproses sebelumnya");
    }

    // 3. Gunakan password dari client atau generate jika tidak ada
    const finalPassword = clientPassword || "P" + Math.random().toString(36).slice(-8) + "!";

    // 4. Buatkan Auth User
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: registration.email,
        password: finalPassword,
        email_confirm: true,
      });

    if (authError) throw authError;
    const newUserId = authData.user.id;

    // 5. Buatkan Toko Baru dengan Slug
    const tokoSlug = registration.store_name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const { data: tokoData, error: tokoError } = await supabaseAdmin
      .from("toko")
      .insert({ 
        nama_toko: registration.store_name,
        slug: tokoSlug 
      })
      .select()
      .single();

    if (tokoError) throw tokoError;
    const newTokoId = tokoData.id;

    // 6. Buat / Update Profile User
    const { error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .upsert(
        {
          id: newUserId,
          role: "admin",
          id_toko: newTokoId,
          nama: registration.store_name,
          email: registration.email,
        },
        { onConflict: "id" },
      );

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      throw profileError;
    }

    // 7. Update status registrasi
    await supabaseAdmin
      .from("tenant_registrations")
      .update({ status: "approved" })
      .eq("id", registrationId);

    // 8. Respons Sukses - TIDAK MENGIRIM PASSWORD BALIK
    return new Response(
      JSON.stringify({
        success: true,
        message: "Tenant berhasil di-approve",
        data: {
          email: registration.email,
          toko: registration.store_name,
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error: any) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Terjadi error di approve-tenant:", errorMsg);

    return new Response(JSON.stringify({ error: errorMsg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
