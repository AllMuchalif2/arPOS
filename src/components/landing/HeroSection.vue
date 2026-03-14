<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary bg-opacity-30 text-white text-sm font-semibold mb-6"
        >
          <span class="flex h-2 w-2 rounded-full bg-white"></span>
          Sistem Kasir
        </div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
        >
          Solusi Kasir Praktis untuk <span class="text-primary">Toko Anda</span>
        </h1>
        <p class="text-lg text-gray-600 mb-8 max-w-xl">
          Catat penjualan, pantau pesanan dengan mudah, dan kelola menu meja
          pelanggan via QR Code. Aplikasi ringan dan dapat diakses offline.
        </p>
        <div class="flex flex-wrap gap-4">
          <a
            href="#register"
            class="bg-primary hover-bg-primary text-white px-8 py-3.5 rounded-full font-semibold text-lg transition-all shadow border border-transparent flex items-center gap-2"
          >
            Coba Sekarang
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
          <a
            href="#features"
            class="bg-white border-2 border-primary hover:bg-base text-primary px-8 py-3.5 rounded-full font-semibold text-lg transition-all flex items-center gap-2"
          >
            Pelajari Fitur
          </a>
        </div>
      </div>

      <!-- Feature Highlights -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-secondary hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Kasir Cepat</h3>
          <p class="text-sm text-gray-600">Proses transaksi hitungan detik.</p>
        </div>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-secondary hover:shadow-md transition-shadow transform translate-y-6">
          <div class="w-10 h-10 bg-info/20 text-info rounded-xl flex items-center justify-center mb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Laporan Realtime</h3>
          <p class="text-sm text-gray-600">Pantau omzet kapan saja.</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-secondary hover:shadow-md transition-shadow">
          <div class="w-10 h-10 bg-success/20 text-success rounded-xl flex items-center justify-center mb-4">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Menu QR Code</h3>
          <p class="text-sm text-gray-600">Pelanggan pesan dari meja.</p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-secondary hover:shadow-md transition-shadow transform translate-y-6">
          <div class="w-10 h-10 bg-warning/20 text-warning rounded-xl flex items-center justify-center mb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Mode Offline</h3>
          <p class="text-sm text-gray-600">Tetap jalan tanpa internet.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
