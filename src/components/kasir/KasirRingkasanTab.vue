<script setup lang="ts">
interface PesananRingkasan {
  id: string;
  nomor_pesanan: string | null;
  nama_pelanggan: string | null;
  tipe_pesanan: string;
  metode_pembayaran: string | null;
  total_harga: number;
  created_at: string;
}

const props = defineProps<{
  pesananHariIni: PesananRingkasan[];
  totalPesanan: number;
  totalPendapatan: number;
  totalDineIn: number;
  totalTakeaway: number;
}>();

const formatRp = (v: number) => "Rp " + v.toLocaleString("id-ID");
const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
const metodeLabel: Record<string, string> = {
  tunai: "Tunai",
  transfer: "Transfer",
  qris: "QRIS",
};
</script>

<template>
  <!-- Stat Cards -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <p
        class="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1"
      >
        Total Pesanan
      </p>
      <p class="text-3xl font-bold text-slate-800">{{ props.totalPesanan }}</p>
    </div>
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <p
        class="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1"
      >
        Pendapatan
      </p>
      <p class="text-xl font-bold text-primary">
        {{ formatRp(props.totalPendapatan) }}
      </p>
    </div>
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <p
        class="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1"
      >
        Dine In
      </p>
      <p class="text-3xl font-bold text-info">{{ props.totalDineIn }}</p>
    </div>
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <p
        class="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1"
      >
        Takeaway
      </p>
      <p class="text-3xl font-bold text-secondary">
        {{ props.totalTakeaway }}
      </p>
    </div>
  </div>

  <!-- Orders Table -->
  <div
    class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
  >
    <div class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">Pesanan Hari Ini</h2>
    </div>

    <div
      v-if="props.pesananHariIni.length === 0"
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <div
        class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4"
      >
        <i class="bx bx-receipt text-3xl text-slate-300"></i>
      </div>
      <p class="text-slate-600 font-medium text-sm">
        Belum ada pesanan hari ini
      </p>
      <p class="text-slate-400 text-xs mt-1">
        Transaksi yang selesai akan otomatis muncul di tabel ini
      </p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead
          class="bg-slate-50 text-xs text-slate-400 uppercase tracking-wide"
        >
          <tr>
            <th class="text-left px-5 py-3">No. Pesanan</th>
            <th class="text-left px-5 py-3">Pelanggan</th>
            <th class="text-left px-5 py-3">Tipe</th>
            <th class="text-left px-5 py-3">Metode</th>
            <th class="text-right px-5 py-3">Total</th>
            <th class="text-right px-5 py-3">Waktu</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr
            v-for="p in props.pesananHariIni"
            :key="p.id"
            class="hover:bg-slate-50/60 transition"
          >
            <td class="px-5 py-3 font-mono text-xs text-slate-500">
              {{ p.nomor_pesanan ?? "-" }}
            </td>
            <td class="px-5 py-3 font-medium text-slate-700">
              {{ p.nama_pelanggan ?? "-" }}
            </td>
            <td class="px-5 py-3">
              <span
                :class="[
                  'px-2 py-0.5 rounded-full text-xs font-medium',
                  p.tipe_pesanan === 'dine_in'
                    ? 'bg-info/15 text-info'
                    : 'bg-secondary/40 text-gray-700',
                ]"
              >
                {{ p.tipe_pesanan === "dine_in" ? "Dine In" : "Takeaway" }}
              </span>
            </td>
            <td class="px-5 py-3 text-slate-600">
              {{
                p.metode_pembayaran
                  ? (metodeLabel[p.metode_pembayaran] ?? p.metode_pembayaran)
                  : "-"
              }}
            </td>
            <td class="px-5 py-3 text-right font-bold text-primary">
              {{ formatRp(p.total_harga) }}
            </td>
            <td class="px-5 py-3 text-right text-slate-400">
              {{ formatTime(p.created_at) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
