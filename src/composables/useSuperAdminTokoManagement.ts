import { ref } from "vue";
import { useSuperadminStore } from "../stores/superadminStore";
import { swalError, swalConfirm, swalSuccess } from "./useSwal";

export function useSuperAdminTokoManagement() {
  const adminStore = useSuperadminStore();
  
  const showModal = ref(false);
  const modalMode = ref<"create" | "edit">("create");
  const tokoName = ref("");
  const editingId = ref("");

  const openCreate = () => {
    modalMode.value = "create";
    tokoName.value = "";
    editingId.value = "";
    showModal.value = true;
  };

  const openEdit = (id: string) => {
    const toko = adminStore.toko.find((t) => t.id === id);
    if (!toko) return;
    
    modalMode.value = "edit";
    tokoName.value = toko.nama_toko;
    editingId.value = id;
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const save = async () => {
    try {
      if (!tokoName.value.trim()) throw new Error("Nama toko wajib diisi");
      
      if (modalMode.value === "create") {
        await adminStore.createToko(tokoName.value);
        await swalSuccess("Toko dibuat", "Toko baru berhasil ditambahkan");
      } else {
        await adminStore.updateToko(editingId.value, tokoName.value);
        await swalSuccess("Toko diubah", "Perubahan tersimpan");
      }
      
      closeModal();
      tokoName.value = "";
    } catch (error: any) {
      await swalError("Kesalahan", error.message);
    }
  };

  const delete_ = async (id: string) => {
    const ok = await swalConfirm("Hapus toko ini?", "Semua data toko akan dihapus.");
    if (!ok) return;

    try {
      await adminStore.deleteToko(id);
      await swalSuccess("Berhasil", "Toko dihapus");
    } catch (error: any) {
      await swalError("Kesalahan", error.message);
    }
  };

  return {
    showModal,
    modalMode,
    tokoName,
    editingId,
    toko: adminStore.toko,
    loading: adminStore.loading,
    openCreate,
    openEdit,
    closeModal,
    save,
    delete: delete_,
    fetch: () => adminStore.fetchToko(),
  };
}
