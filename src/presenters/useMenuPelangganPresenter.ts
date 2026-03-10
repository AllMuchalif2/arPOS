import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../supabaseClient";
import { usePwaInstall } from "../composables/usePwaInstall";
import { slugify } from "../composables/useSlugify";
import { swalError } from "../composables/useSwal";

export interface ProdukPelanggan {
  id: string;
  nama: string;
  harga: number;
  foto_url: string | null;
  id_kategori: string | null;
}

export function useMenuPelangganPresenter() {
  const route = useRoute();
  const { isInstallable, installApp } = usePwaInstall();

  // Support both slug route (/menu/:tokoSlug/:mejaSlug) and old query params (?toko=uuid&meja=uuid)
  const tokoSlugParam = route.params.tokoSlug as string | undefined;
  const mejaSlugParam = route.params.mejaSlug as string | undefined;
  const tokoIdParam = route.query.toko as string | undefined;
  const mejaIdParam = route.query.meja as string | undefined;

  const resolvedIdToko = ref("");
  const resolvedIdMeja = ref("");
  const idMeja = ref(""); // display (nomor_meja or slug)

  const products = ref<ProdukPelanggan[]>([]);
  const loading = ref(true);
  const namaPelanggan = ref("");
  const processing = ref(false);
  const orderSuccess = ref(false);
  const isCartOpen = ref(false);

  const cart = ref<{ product: ProdukPelanggan; qty: number }[]>([]);

  const totalCartAmount = computed(() => {
    return cart.value.reduce(
      (total, item) => total + item.product.harga * item.qty,
      0,
    );
  });

  const cartItemsCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.qty, 0);
  });

  const loadMenu = async () => {
    try {
      // --- Slug mode: /menu/:tokoSlug/:mejaSlug ---
      if (tokoSlugParam) {
        // Fetch all toko and find by slug
        const { data: allToko } = await supabase
          .from("toko")
          .select("id, nama_toko");

        const matched = (allToko || []).find(
          (t: any) => slugify(t.nama_toko) === tokoSlugParam,
        );
        if (!matched) {
          await swalError(
            "Toko tidak ditemukan",
            "QR Code tidak valid atau toko sudah tidak aktif",
          );
          loading.value = false;
          return;
        }
        resolvedIdToko.value = matched.id;

        // Find meja by slug
        if (mejaSlugParam) {
          const { data: allMeja } = await supabase
            .from("meja")
            .select("id, nomor_meja")
            .eq("id_toko", matched.id)
            .is("deleted_at", null);

          const matchedMeja = (allMeja || []).find(
            (m: any) => slugify(m.nomor_meja) === mejaSlugParam,
          );
          if (matchedMeja) {
            resolvedIdMeja.value = matchedMeja.id;
            idMeja.value = matchedMeja.nomor_meja;
          }
        }
      } else if (tokoIdParam) {
        // --- Legacy mode: ?toko=uuid&meja=uuid ---
        resolvedIdToko.value = tokoIdParam;
        if (mejaIdParam) {
          resolvedIdMeja.value = mejaIdParam;
          idMeja.value = mejaIdParam;
        }
      } else {
        await swalError("QR Code tidak valid", "Toko tidak ditemukan");
        loading.value = false;
        return;
      }

      // Fetch menu
      const { data: produkData, error } = await supabase
        .from("menu")
        .select("*")
        .eq("id_toko", resolvedIdToko.value)
        .eq("tersedia", true)
        .is("deleted_at", null)
        .order("nama");

      if (error) throw error;
      if (produkData) products.value = produkData;
    } catch (err: any) {
      await swalError("Gagal memuat menu", err.message);
    } finally {
      loading.value = false;
    }
  };

  const addToCart = (product: ProdukPelanggan) => {
    const existing = cart.value.find((item) => item.product.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      cart.value.push({ product, qty: 1 });
    }
  };

  const updateQty = (index: number, delta: number) => {
    const item = cart.value[index];
    if (item.qty + delta > 0) {
      item.qty += delta;
    } else {
      cart.value.splice(index, 1);
      if (cart.value.length === 0) isCartOpen.value = false;
    }
  };

  const submitOrder = async () => {
    if (cart.value.length === 0) {
      await swalError("Keranjang kosong", "Tambahkan menu terlebih dahulu");
      return;
    }
    if (!namaPelanggan.value) {
      await swalError(
        "Nama wajib diisi",
        "Masukkan nama pemesan sebelum memesan",
      );
      return;
    }

    processing.value = true;
    try {
      const { data: pesanan, error: pesananErr } = await supabase
        .from("pesanan")
        .insert({
          id_toko: resolvedIdToko.value,
          id_meja: resolvedIdMeja.value || null,
          nama_pelanggan: namaPelanggan.value,
          tipe_pesanan: "qr_menu",
          total_harga: totalCartAmount.value,
          status: "pending",
          nomor_pesanan: `QR-${Date.now()}`,
        })
        .select()
        .single();

      if (pesananErr) throw pesananErr;

      const details = cart.value.map((item) => ({
        id_pesanan: pesanan.id,
        id_toko: resolvedIdToko.value,
        id_menu: item.product.id,
        jumlah: item.qty,
        harga_satuan: item.product.harga,
        subtotal: item.qty * item.product.harga,
      }));

      const { error: detailErr } = await supabase
        .from("detail_pesanan")
        .insert(details);
      if (detailErr) throw detailErr;

      orderSuccess.value = true;
      cart.value = [];
      isCartOpen.value = false;
    } catch (err: any) {
      await swalError("Gagal mengirim pesanan", err.message);
    } finally {
      processing.value = false;
    }
  };

  onMounted(() => {
    loadMenu();
  });

  return {
    idMeja,
    isInstallable,
    installApp,
    products,
    loading,
    namaPelanggan,
    processing,
    orderSuccess,
    cart,
    isCartOpen,
    totalCartAmount,
    cartItemsCount,
    addToCart,
    updateQty,
    submitOrder,
  };
}
