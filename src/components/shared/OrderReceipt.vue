<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();
const storeName = computed(() => authStore.profile?.toko?.nama_toko || "veePOS Store");

const props = defineProps<{
  pesanan: any;
  items: any[];
}>();

// Filter out cancelled items as per user request
const activeItems = computed(() => {
  return props.items.filter((item) => item.status !== "kosong");
});

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <div class="print-only receipt-container">
    <div class="receipt-header">
      <h1 class="store-name">{{ storeName }}</h1>
      <p class="receipt-divider">================================</p>
    </div>

    <div class="receipt-info">
      <p>No: {{ pesanan?.nomor_pesanan }}</p>
      <p>Tgl: {{ formatDate(pesanan?.created_at) }}</p>
      <p>Plg: {{ pesanan?.nama_pelanggan }}</p>
      <p v-if="pesanan?.meja?.nomor_meja">Meja: {{ pesanan.meja.nomor_meja }}</p>
      <p>Tipe: {{ pesanan?.tipe_pesanan?.toUpperCase() }}</p>
      <p class="receipt-divider">--------------------------------</p>
    </div>

    <table class="receipt-table">
      <tbody>
        <tr v-for="item in activeItems" :key="item.id">
          <td colspan="2">
            <div class="item-row">
              <span class="item-name">{{ item.menu?.nama }}</span>
              <div class="item-details">
                <span>{{ item.jumlah }} x {{ item.harga_satuan.toLocaleString("id-ID") }}</span>
                <span class="item-subtotal">{{ item.subtotal.toLocaleString("id-ID") }}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="receipt-footer">
      <p class="receipt-divider">--------------------------------</p>
      <div class="total-row">
        <span>TOTAL</span>
        <span>Rp {{ pesanan?.total_harga.toLocaleString("id-ID") }}</span>
      </div>
      <div class="payment-info" v-if="pesanan?.metode_pembayaran">
        <span>Bayar: {{ pesanan.metode_pembayaran.toUpperCase() }}</span>
      </div>
      <p class="receipt-divider">================================</p>
      <p class="thank-you">TERIMA KASIH</p>
      <p class="footer-note">veePOS - Modern POS System</p>
    </div>
  </div>
</template>

<style scoped>
/* Hidden on screen, shown only on print */
.print-only {
  display: none;
}

@media print {
  .print-only {
    display: block !important;
    width: 100%;
    max-width: 300px; /* Standard thermal width */
    margin: 0 auto;
    font-family: "Courier New", Courier, monospace;
    font-size: 12px;
    line-height: 1.2;
    color: #000;
    background: #fff;
  }

  .receipt-container {
    padding: 10px;
  }

  .store-name {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 5px 0;
  }

  .receipt-divider {
    text-align: center;
    margin: 5px 0;
    letter-spacing: -1px;
  }

  .receipt-info p {
    margin: 2px 0;
  }

  .receipt-table {
    width: 100%;
    border-collapse: collapse;
  }

  .item-row {
    margin-bottom: 5px;
  }

  .item-name {
    display: block;
    font-weight: bold;
  }

  .item-details {
    display: flex;
    justify-content: space-between;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px;
  }

  .payment-info {
    margin-top: 5px;
    text-align: right;
  }

  .thank-you, .footer-note {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
