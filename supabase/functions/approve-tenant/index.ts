import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Tangani preflight OPTIONS request untuk CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Gagal parse JSON:", parseError);
      throw new Error("Format payload request tidak valid (Bukan JSON)");
    }

    const registrationId = body?.registrationId;
    console.log("Mencoba proses registrasi dengan ID:", registrationId);

    if (!registrationId) {
      throw new Error("registrationId tidak diberikan dalam payload body");
    }

    // 1. Buat client supabase dengan SERVICE ROLE KEY untuk hak akses Admin
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

    // 3. Buatkan Auth User (Tenant Admin)
    // Password sementara: Kita buat random atau standar
    const tempPassword = "P" + Math.random().toString(36).slice(-8) + "!";

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: registration.email,
        password: tempPassword,
        email_confirm: true, // Otomatis terkonfirmasi
      });

    if (authError) throw authError;
    const newUserId = authData.user.id;

    // 4. Buatkan Toko Baru
    const { data: tokoData, error: tokoError } = await supabaseAdmin
      .from("toko")
      .insert({ nama_toko: registration.store_name })
      .select()
      .single();

    if (tokoError) throw tokoError;
    const newTokoId = tokoData.id;

    // 5. Buat / Update Profile User menjadi "admin" dan set toko_id
    // Biasanya trigger authentication Supabase langsung insert ke `user_profiles`.
    // Kita gunakan upsert (atau update jika sudah di-insert trigger) untuk memasukkan role & toko_id.
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
      console.warn("Gagal update user_profiles:", profileError);
      throw new Error(`Gagal membuat profil user: ${profileError.message}`);
    }

    // 6. Update status registrasi menjadi approved
    await supabaseAdmin
      .from("tenant_registrations")
      .update({ status: "approved" })
      .eq("id", registrationId);

    // 8. Berikan respons sukses
    return new Response(
      JSON.stringify({
        success: true,
        message: "Tenant berhasil di-approve",
        credentials: {
          email: registration.email,
          temporaryPassword: tempPassword,
        },
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
