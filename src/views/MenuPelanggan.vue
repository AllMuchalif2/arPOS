<script setup lang="ts">
import { useMenuPelangganPresenter } from "../presenters/useMenuPelangganPresenter";

const {
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
} = useMenuPelangganPresenter();
</script>

<template>
  <div class="min-h-screen bg-base font-sans pb-24">
    <!-- Success State -->
    <div
      v-if="orderSuccess"
      class="min-h-screen flex flex-col items-center justify-center p-6 text-center"
    >
      <div
        class="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6"
      >
        <i class="bx bx-check text-5xl text-success"></i>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Pesanan Diterima!</h1>
      <p class="text-gray-500 mb-2 max-w-xs">
        Pesanan Anda sedang diproses. Silakan
        <span class="font-semibold text-primary">menuju kasir</span> untuk
        melakukan pembayaran.
      </p>
      <div
        class="flex items-center gap-2 bg-warning/10 border border-warning/30 text-warning text-sm font-medium px-4 py-2.5 rounded-xl mb-8"
      >
        <i class="bx bx-info-circle text-lg"></i>
        Tunjukkan pesanan ini ke kasir
      </div>
      <button
        @click="orderSuccess = false"
        class="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-[#c99188] transition-colors"
      >
        Pesan Lagi
      </button>
    </div>

    <!-- Main Menu Area -->
    <div v-else>
      <!-- Mobile Header -->
      <header
        class="bg-white px-5 py-4 sticky top-0 z-30 shadow-sm flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
          >
            <i class="bx bx-restaurant text-xl"></i>
          </div>
          <div>
            <h1 class="font-bold text-gray-800 leading-tight">
              Cafe Digital Menu
            </h1>
            <p v-if="idMeja" class="text-xs text-gray-500 font-medium">
              Meja {{ idMeja }}
            </p>
          </div>
        </div>

        <button
          v-if="isInstallable"
          @click="installApp"
          class="text-xs bg-info text-white px-3 py-1.5 rounded-lg flex items-center gap-1 shadow hover:bg-info/80 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Install
        </button>
      </header>

      <!-- Welcome Banner -->
      <div class="px-5 pt-6 pb-2">
        <h2 class="text-2xl font-bold text-gray-800">Halo,</h2>
        <p class="text-gray-500">Mau pesan apa hari ini?</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-20">
        <i class="bx bx-loader-alt bx-spin text-4xl text-primary"></i>
      </div>

      <!-- Products Grid -->
      <main v-else class="p-5 grid grid-cols-2 gap-4">
        <div
          v-for="p in products"
          :key="p.id"
          class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col relative"
        >
          <div
            class="h-28 w-full rounded-xl bg-gray-50 mb-3 overflow-hidden relative"
          >
            <img
              v-if="p.foto_url"
              :src="p.foto_url"
              class="w-full h-full object-cover"
            />
            <i
              v-else
              class="bx bx-image text-gray-300 text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            ></i>
          </div>
          <h3 class="font-bold text-gray-800 text-sm line-clamp-2 leading-snug">
            {{ p.nama }}
          </h3>
          <p class="text-primary font-bold text-sm mt-auto pb-2">
            Rp {{ p.harga.toLocaleString("id-ID") }}
          </p>

          <button
            @click="addToCart(p)"
            class="absolute bottom-3 right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-md shadow-primary/30 hover:bg-[#c99188] transition-transform active:scale-95"
          >
            <i class="bx bx-plus text-lg"></i>
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-if="products.length === 0"
          class="col-span-2 text-center py-12 text-gray-400"
        >
          <i class="bx bx-sad text-5xl mb-2"></i>
          <p>Menu belum tersedia</p>
        </div>
      </main>

      <!-- Floating Cart Summary Widget -->
      <div
        v-if="cartItemsCount > 0 && !isCartOpen"
        class="fixed bottom-6 left-5 right-5 z-40"
      >
        <button
          @click="isCartOpen = true"
          class="w-full bg-gray-900 text-white rounded-2xl p-4 flex justify-between items-center shadow-xl shadow-gray-900/20 active:scale-[0.98] transition-transform"
        >
          <div class="flex items-center gap-3">
            <div
              class="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            >
              {{ cartItemsCount }}
            </div>
            <span class="font-medium">Lihat Pesanan</span>
          </div>
          <span class="font-bold tracking-wide"
            >Rp {{ totalCartAmount.toLocaleString("id-ID") }}</span
          >
        </button>
      </div>

      <!-- Bottom Sheet Cart (Modal) -->
      <div
        v-if="isCartOpen"
        class="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm transition-opacity"
      >
        <div
          class="bg-white w-full rounded-t-3xl overflow-hidden flex flex-col max-h-[85vh] animate-[slideUp_0.3s_ease-out]"
        >
          <div
            class="p-5 border-b border-gray-100 flex justify-between items-center shrink-0"
          >
            <div>
              <h2 class="text-xl font-bold text-gray-800">Keranjang Anda</h2>
              <p class="text-sm text-gray-500">
                {{ cartItemsCount }} item terpilih
              </p>
            </div>
            <button
              @click="isCartOpen = false"
              class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600"
            >
              <i class="bx bx-x text-xl"></i>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-5 space-y-4">
            <div v-for="(item, i) in cart" :key="i" class="flex gap-3">
              <div
                class="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden shrink-0"
              >
                <img
                  v-if="item.product.foto_url"
                  :src="item.product.foto_url"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 flex flex-col justify-between">
                <h4 class="font-medium text-sm text-gray-800">
                  {{ item.product.nama }}
                </h4>
                <div class="flex justify-between items-end">
                  <p class="font-bold text-primary text-sm">
                    Rp
                    {{
                      (item.qty * item.product.harga).toLocaleString("id-ID")
                    }}
                  </p>

                  <div
                    class="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100"
                  >
                    <button
                      @click="updateQty(i, -1)"
                      class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                    >
                      <i class="bx bx-minus text-xs"></i>
                    </button>
                    <span class="text-sm font-semibold w-4 text-center">{{
                      item.qty
                    }}</span>
                    <button
                      @click="updateQty(i, 1)"
                      class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                    >
                      <i class="bx bx-plus text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Customer Details input inside Cart -->
            <div class="mt-6 pt-6 border-t border-gray-100">
              <label class="block text-sm font-bold text-gray-800 mb-2"
                >Nama Pemesan</label
              >
              <input
                v-model="namaPelanggan"
                type="text"
                placeholder="Cth: Budi"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
              />
            </div>
          </div>

          <div class="p-5 bg-white border-t border-gray-100 shrink-0">
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-500 font-medium">Total Pembayaran</span>
              <span class="text-2xl font-bold text-gray-800"
                >Rp {{ totalCartAmount.toLocaleString("id-ID") }}</span
              >
            </div>
            <button
              @click="submitOrder"
              :disabled="processing || !namaPelanggan"
              class="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c99188] transition-colors shadow-lg shadow-primary/20"
            >
              <i v-if="processing" class="bx bx-loader-alt bx-spin mr-2"></i>
              {{ processing ? "Memproses..." : "Pesan Sekarang" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
