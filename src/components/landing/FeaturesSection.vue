<template>
  <section id="features" class="bg-base py-20 border-y border-secondary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Fitur Kasir veePOS</h2>
        <p class="text-gray-600">
          Sederhana dan mudah digunakan untuk keperluan toko harian Anda.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- Fitur 1 -->
        <div
          class="bg-white p-8 rounded-2xl shadow-sm border border-secondary hover:shadow-md transition-shadow"
        >
          <div
            class="w-12 h-12 bg-secondary bg-opacity-30 text-primary rounded-xl flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Kasir Praktis</h3>
          <p class="text-gray-600 leading-relaxed">
            Catat pesanan dengan cepat. Mendukung mode offline menggunakan PWA
            sehingga tetap bisa beroperasi saat internet terputus.
          </p>
        </div>

        <!-- Fitur 2 -->
        <div
          class="bg-white p-8 rounded-2xl shadow-sm border border-secondary hover:shadow-md transition-shadow"
        >
          <div
            class="w-12 h-12 bg-secondary bg-opacity-30 text-primary rounded-xl flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            Laporan Penjualan
          </h3>
          <p class="text-gray-600 leading-relaxed">
            Pantau data penjualan harian dan riwayat transaksi melalui dashboard
            Admin Toko.
          </p>
        </div>

        <!-- Fitur 3 -->
        <div
          class="bg-white p-8 rounded-2xl shadow-sm border border-secondary hover:shadow-md transition-shadow"
        >
          <div
            class="w-12 h-12 bg-secondary bg-opacity-30 text-primary rounded-xl flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Menu QR Code</h3>
          <p class="text-gray-600 leading-relaxed">
            Sistem mencetak QR Code untuk setiap meja, memungkinkan pelanggan
            melihat menu dari HP mereka.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
