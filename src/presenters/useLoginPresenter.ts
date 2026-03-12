import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabaseClient";
import { useAuthStore } from "../stores/authStore";

export function useLoginPresenter() {
  const router = useRouter();
  const auth = useAuthStore();

  const email = ref("");
  const password = ref("");
  const loading = ref(false);
  const errorMsg = ref("");

  const handleLogin = async () => {
    try {
      loading.value = true;
      errorMsg.value = "";

      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;

      await auth.loadUser();
      const role = auth.profile?.role;
      if (role === "superadmin") {
        router.push({ name: "SuperAdmin" });
      } else if (role === "admin") {
        router.push({ name: "AdminToko" });
      } else {
        router.push({ name: "Kasir" });
      }
    } catch (error: any) {
      errorMsg.value = error.message || "Login failed";
    } finally {
      loading.value = false;
    }
  };

  return {
    email,
    password,
    loading,
    errorMsg,
    handleLogin,
  };
}
