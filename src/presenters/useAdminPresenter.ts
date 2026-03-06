import { ref, onMounted } from "vue";
import { supabase } from "../supabaseClient";
import { useRouter } from "vue-router";
import { usePosStore, type Produk } from "../stores/posStore";
import { useImageUpload } from "../composables/useImageUpload";
import { swalError, swalConfirm, swalSuccess } from "../composables/useSwal";
import { usePwaInstall } from "../composables/usePwaInstall";

export function useAdminPresenter() {
  const router = useRouter();
  const posStore = usePosStore();
  const { uploadImage, isUploading, uploadError } = useImageUpload();
  const { isInstallable, installApp } = usePwaInstall();

  const products = ref<Produk[]>([]);
  const loading = ref(false);
  const showModal = ref(false);

  const newProduct = ref<{
    nama: string;
    harga: number;
    foto_url: string | null;
  }>({
    nama: "",
    harga: 0,
    foto_url: null,
  });
  const selectedFile = ref<File | null>(null);

  const loadProducts = async () => {
    loading.value = true;
    await posStore.fetchMenu();
    products.value = posStore.products;
    loading.value = false;
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      selectedFile.value = target.files[0];
    }
  };

  const saveProduct = async () => {
    try {
      let fotoUrl = newProduct.value.foto_url;

      // Upload image if selected
      if (selectedFile.value) {
        const url = await uploadImage(selectedFile.value);
        if (url) fotoUrl = url;
        if (uploadError.value) throw new Error(uploadError.value);
      }

      const { data: userData } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("id_toko")
        .eq("id", userData.user?.id)
        .single();

      const { error } = await supabase.from("produk").insert({
        id_toko: profile?.id_toko,
        nama: newProduct.value.nama,
        harga: newProduct.value.harga,
        foto_url: fotoUrl,
      });

      if (error) throw error;

      showModal.value = false;
      selectedFile.value = null;
      newProduct.value = { nama: "", harga: 0, foto_url: null };
      loadProducts();
    } catch (err: any) {
      await swalError("Kesalahan", err.message);
    }
  };

  const deleteProduct = async (id: string) => {
    const ok = await swalConfirm(
      "Hapus produk ini?",
      "Produk akan dihapus permanen.",
    );
    if (!ok) return;
    try {
      const { error } = await supabase.from("produk").delete().eq("id", id);
      if (error) throw error;
      await swalSuccess("Berhasil", "Produk dihapus");
      loadProducts();
    } catch (err: any) {
      await swalError("Kesalahan", err.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  onMounted(() => {
    loadProducts();
  });

  return {
    router,
    isInstallable,
    installApp,
    products,
    loading,
    showModal,
    newProduct,
    isUploading,
    handleFileChange,
    saveProduct,
    deleteProduct,
    logout,
  };
}
