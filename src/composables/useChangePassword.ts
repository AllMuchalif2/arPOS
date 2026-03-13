import { ref } from "vue";
import { supabase } from "../supabaseClient";
import { swalSuccess, swalError } from "./useSwal";

export function useChangePassword() {
  const newPassword = ref("");
  const confirmPassword = ref("");
  const isUpdating = ref(false);

  const changePassword = async () => {
    if (!newPassword.value || !confirmPassword.value) {
      await swalError("Gagal", "Password baru dan konfirmasi harus diisi");
      return;
    }

    if (newPassword.value.length < 6) {
      await swalError("Gagal", "Password minimal harus 6 karakter");
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      await swalError("Gagal", "Konfirmasi password tidak cocok");
      return;
    }

    isUpdating.value = true;
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword.value,
      });

      if (error) throw error;

      await swalSuccess("Berhasil", "Password Anda telah diperbarui");
      newPassword.value = "";
      confirmPassword.value = "";
    } catch (err: any) {
      await swalError("Gagal memperbarui password", err.message);
    } finally {
      isUpdating.value = false;
    }
  };

  return {
    newPassword,
    confirmPassword,
    isUpdating,
    changePassword,
  };
}
