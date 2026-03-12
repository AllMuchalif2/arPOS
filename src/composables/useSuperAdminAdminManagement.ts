import { ref } from "vue";
import { useSuperadminStore } from "../stores/superadminStore";
import { swalError, swalSuccess, swalConfirm } from "./useSwal";

export interface AdminFormData {
  email: string;
  password: string;
  nama: string;
  tokoId: string;
}

export function useSuperAdminAdminManagement() {
  const adminStore = useSuperadminStore();

  const showModal = ref(false);
  const isCreating = ref(false);

  const form = ref<AdminFormData>({
    email: "",
    password: "",
    nama: "",
    tokoId: adminStore.toko[0]?.id || "",
  });

  const openModal = () => {
    form.value = {
      email: "",
      password: "",
      nama: "",
      tokoId: adminStore.toko[0]?.id || "",
    };
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const save = async () => {
    try {
      if (!form.value.email.trim()) throw new Error("Email wajib diisi");
      if (!form.value.password) throw new Error("Password wajib diisi");
      if (!form.value.nama.trim()) throw new Error("Nama wajib diisi");
      if (!form.value.tokoId) throw new Error("Pilih toko");

      isCreating.value = true;

      const { supabase } = await import("../supabaseClient");

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Sesi tidak valid, silakan login ulang");
      const { data, error } = await supabase.functions.invoke(
        "create-admin-user",
        {
          body: {
            email: form.value.email,
            password: form.value.password,
            nama: form.value.nama,
            tokoId: form.value.tokoId,
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Gagal membuat admin");

      try {
        await adminStore.fetchAdminAccounts();
      } catch (e) {
      }

      closeModal();
      await swalSuccess("Admin dibuat", "Akun admin berhasil dibuat");
    } catch (error: any) {
      await swalError("Kesalahan", error.message || String(error));
    } finally {
      isCreating.value = false;
    }
  };

  const delete_ = async (id: string) => {
    const ok = await swalConfirm(
      "Hapus admin ini?",
      "Akun admin akan dihapus (soft delete)",
    );
    if (!ok) return;

    try {
      await adminStore.deleteAdminAccount(id);
      await swalSuccess("Berhasil", "Akun admin dihapus");
    } catch (error: any) {
      await swalError("Kesalahan", error.message);
    }
  };

  return {
    showModal,
    isCreating,
    form,
    accounts: adminStore.adminAccounts,
    tokoList: adminStore.toko,
    loading: adminStore.loading,
    openModal,
    closeModal,
    save,
    delete: delete_,
    fetch: () => adminStore.fetchAdminAccounts(),
  };
}
