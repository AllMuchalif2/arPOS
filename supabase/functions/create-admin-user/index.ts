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
    // 1. Ambil JWT dari header Authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // 2. Buat admin client menggunakan SERVICE_ROLE_KEY (tersedia otomatis di server)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // 3. Verifikasi token caller dan ambil profile-nya
    const {
      data: { user: caller },
      error: callerErr,
    } = await supabaseAdmin.auth.getUser(authHeader.replace("Bearer ", ""));

    if (callerErr || !caller) {
      return new Response(JSON.stringify({ error: "Token tidak valid" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // 4. Pastikan caller adalah superadmin
    const { data: callerProfile, error: profileErr } = await supabaseAdmin
      .from("user_profiles")
      .select("role")
      .eq("id", caller.id)
      .single();

    if (profileErr || callerProfile?.role !== "superadmin") {
      return new Response(
        JSON.stringify({
          error: "Forbidden: hanya superadmin yang dapat membuat admin",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403,
        },
      );
    }

    // 5. Ambil payload dari request body
    let body: { email: string; password: string; nama: string; tokoId: string };
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Format payload tidak valid" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const { email, password, nama, tokoId } = body;

    if (!email || !password || !nama || !tokoId) {
      return new Response(
        JSON.stringify({
          error: "email, password, nama, dan tokoId wajib diisi",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // 6. Buat Auth User baru
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Gagal membuat user");

    // 7. Buat user_profile dengan role admin
    const { error: profileInsertErr } = await supabaseAdmin
      .from("user_profiles")
      .insert({
        id: authData.user.id,
        id_toko: tokoId,
        role: "admin",
        nama,
        email,
      });

    if (profileInsertErr) {
      // Rollback: hapus auth user jika insert profile gagal
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw profileInsertErr;
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: { id: authData.user.id, email, nama, tokoId },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error: any) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error di create-admin-user:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
