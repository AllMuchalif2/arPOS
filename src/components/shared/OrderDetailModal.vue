<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { usePosStore } from "../../stores/posStore";
import { swalError, swalSuccess, swalConfirm } from "../../composables/useSwal";
import OrderReceipt from "./OrderReceipt.vue";


const props = defineProps<{
  show: boolean;
  pesanan: any;
}>();

const emit = defineEmits(["close", "updated"]);

const posStore = usePosStore();

const orderItems = ref<any[]>([]);
const loadingItems = ref(false);
const originalTotal = ref(0);
const processing = ref(false);

const showAddMenu = ref(false);
const itemSearch = ref("");

const fetchDetails = async () => {
  if (!props.pesanan?.id) return;
  loadingItems.value = true;
  orderItems.value = await posStore.fetchOrderDetails(props.pesanan.id);
  loadingItems.value = false;
};

watch(
  () => props.show,
  (newShow) => {
    if (newShow && props.pesanan) {
      originalTotal.value = Number(props.pesanan.total_harga) || 0;
      fetchDetails();
    } else {
      showAddMenu.value = false;
      itemSearch.value = "";
    }
  },
);

const totalDiff = computed(() => {
  if (!props.pesanan) return 0;
  return Number(props.pesanan.total_harga || 0) - originalTotal.value;
});

const availableProducts = computed(() => {
  return posStore.products
    .filter((p) => p.tersedia)
    .filter((p) =>
      p.nama.toLowerCase().includes(itemSearch.value.toLowerCase()),
    );
});

const handleStokKosong = async (item: any) => {
  const isConfirmed = await swalConfirm(
    "Stok Habis?",
    `Item "${item.menu?.nama}" akan dibatalkan dari pesanan ini dan menu akan dimatikan dari katalog. Lanjutkan?`,
  );

  if (isConfirmed) {
    try {
      await posStore.markItemAsEmpty(item.id);
      await swalSuccess(
        "Berhasil",
        "Item dibatalkan dan total harga diperbarui.",
      );

      await fetchDetails();
      emit("updated");
    } catch (err: any) {
      await swalError("Gagal menunda item", err.message);
    }
  }
};

const handleAddMenu = async (menu: any) => {
  if (!props.pesanan) return;

  try {
    processing.value = true;
    await posStore.addItemToOrder(props.pesanan.id, menu.id, 1);
    await swalSuccess("Berhasil", `${menu.nama} ditambahkan ke pesanan.`);

    await fetchDetails();
    emit("updated");
    showAddMenu.value = false;
  } catch (err: any) {
    await swalError("Gagal menambah menu", err.message);
  } finally {
    processing.value = false;
  }
};

const printReceipt = () => {
  window.print();
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
    >
      <!-- Header -->
      <div
        class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
      >
        <div>
          <h3 class="font-bold text-slate-800">Detail Pesanan</h3>
          <p class="text-xs text-slate-500">
            {{ pesanan?.nomor_pesanan }} - {{ pesanan?.nama_pelanggan }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="
              pesanan?.status === 'pending' || pesanan?.status === 'diproses'
            "
            @click="showAddMenu = !showAddMenu"
            class="text-xs font-bold px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center gap-1"
          >
            <i
              class="bx"
              :class="showAddMenu ? 'bx-chevron-left' : 'bx-plus'"
            ></i>
            {{ showAddMenu ? "Kembali" : "Tambah Menu" }}
          </button>
          
          <button
            v-if="!showAddMenu && pesanan?.status !== 'pending'"
            @click="printReceipt"
            class="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition flex items-center gap-1 shadow-sm border border-slate-200"
            title="Cetak Nota (Struk)"
          >
            <i class="bx bx-printer"></i>
            Cetak
          </button>

          <button
            @click="emit('close')"
            class="p-2 text-slate-400 hover:text-slate-600 transition"
          >
            <i class="bx bx-x text-2xl"></i>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div v-if="loadingItems" class="text-center py-8">
          <i class="bx bx-loader-alt bx-spin text-3xl text-primary"></i>
        </div>

        <template v-else>
          <!-- View: Menu Picker (Swap/Add) -->
          <div
            v-if="showAddMenu"
            class="space-y-4 animate-in slide-in-from-right-4 duration-200"
          >
            <div class="sticky top-0 bg-white pb-2 z-10">
              <div class="relative">
                <i
                  class="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                ></i>
                <input
                  v-model="itemSearch"
                  type="text"
                  placeholder="Cari menu pengganti..."
                  class="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-2">
              <button
                v-for="p in availableProducts"
                :key="p.id"
                @click="handleAddMenu(p)"
                :disabled="processing"
                class="flex items-center gap-3 p-2 hover:bg-slate-50 transition rounded-xl border border-transparent hover:border-slate-200 text-left"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-slate-100 shrink-0 overflow-hidden"
                >
                  <img
                    v-if="p.foto_url"
                    :src="p.foto_url"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center text-slate-200 bg-slate-50"
                  >
                    <i class="bx bx-image text-xl"></i>
                  </div>
                </div>
                <div class="flex-1">
                  <h5 class="text-sm font-bold text-slate-800">{{ p.nama }}</h5>
                  <p class="text-xs text-primary font-bold">
                    Rp {{ p.harga.toLocaleString("id-ID") }}
                  </p>
                </div>
                <i class="bx bx-plus text-slate-300"></i>
              </button>
            </div>
          </div>

          <!-- View: Item List -->
          <div v-else class="space-y-4">
            <div
              v-for="item in orderItems"
              :key="item.id"
              class="flex items-center gap-4 group"
            >
              <div
                class="w-12 h-12 rounded-xl bg-slate-100 shrink-0 overflow-hidden"
              >
                <img
                  v-if="item.menu?.foto_url"
                  :src="item.menu.foto_url"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-slate-300"
                >
                  <i class="bx bx-image text-2xl"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h4 class="text-sm font-semibold text-slate-800 truncate">
                    {{ item.menu?.nama || "Menu Terhapus" }}
                  </h4>
                  <span
                    v-if="item.status === 'kosong'"
                    class="px-1.5 py-0.5 rounded bg-danger/10 text-danger text-[10px] font-bold uppercase tracking-wider"
                    >Stok Kosong</span
                  >
                </div>
                <p class="text-xs text-slate-500">
                  {{ item.jumlah }}x @ Rp
                  {{ (Number(item.harga_satuan) || 0).toLocaleString("id-ID") }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold text-slate-800">
                  Rp {{ (Number(item.subtotal) || 0).toLocaleString("id-ID") }}
                </p>
                <!-- Action: Mark empty only if previously normal and status allows edit (pending/diproses) -->
                <button
                  v-if="
                    item.status !== 'kosong' &&
                    (pesanan?.status === 'pending' ||
                      pesanan?.status === 'diproses')
                  "
                  @click="handleStokKosong(item)"
                  class="text-[10px] text-danger hover:underline mt-1 font-medium"
                >
                  Stok Kosong
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Footer / Summary -->
      <div class="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
        <!-- Logika Selisih Harga (Net) -->
        <div
          v-if="totalDiff < 0"
          class="flex justify-between items-center text-danger bg-danger/5 p-3 rounded-xl border border-danger/20"
        >
          <div class="flex flex-col">
            <span
              class="text-xs font-medium uppercase tracking-wider opacity-70"
              >Sisa Pengembalian</span
            >
            <span class="text-danger font-black"
              >Kembalikan Rp
              {{ Math.abs(totalDiff).toLocaleString("id-ID") }}</span
            >
          </div>
          <i class="bx bx-left-arrow-circle text-2xl"></i>
        </div>

        <div
          v-else-if="totalDiff > 0"
          class="flex justify-between items-center text-primary bg-primary/5 p-3 rounded-xl border border-primary/20"
        >
          <div class="flex flex-col">
            <span
              class="text-xs font-medium uppercase tracking-wider opacity-70"
              >Kurang Bayar</span
            >
            <span class="text-primary font-black"
              >Tagih Tambahan Rp {{ totalDiff.toLocaleString("id-ID") }}</span
            >
          </div>
          <i class="bx bx-plus-circle text-2xl"></i>
        </div>

        <div class="flex justify-between items-center px-1">
          <span class="text-xs text-slate-500 font-medium italic"
            >Nota Awal: Rp {{ originalTotal.toLocaleString("id-ID") }}</span
          >
          <div class="text-right">
            <span
              class="text-[10px] text-slate-400 block uppercase font-bold tracking-tight"
              >Total Akhir</span
            >
            <span class="text-lg font-black text-slate-900"
              >Rp
              {{
                (Number(pesanan?.total_harga) || 0).toLocaleString("id-ID")
              }}</span
            >
          </div>
        </div>

        <button
          @click="emit('close')"
          class="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition active:scale-[0.98] mt-2 shadow-lg shadow-slate-200"
        >
          Tutup
        </button>
      </div>
    </div>

    <!-- Hidden Order Receipt for Printing -->
    <OrderReceipt :pesanan="pesanan" :items="orderItems" />
  </div>
</template>

<style scoped>
/* Scoped styles for the modal if needed, but print is now global */
</style>
