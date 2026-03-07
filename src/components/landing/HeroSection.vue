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

      <!-- Mockup -->
      <div class="relative">
        <div
          class="absolute inset-0 bg-secondary rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl"
        ></div>
        <div
          class="relative bg-white rounded-2xl shadow-xl border border-secondary p-2 overflow-hidden aspect-4/3 flex flex-col"
        >
          <div
            class="border-b border-gray-100 p-3 flex items-center gap-2 bg-base"
          >
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-amber-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div
              class="mx-auto w-1/2 h-4 bg-secondary bg-opacity-40 rounded-full"
            ></div>
          </div>
          <div
            class="grow bg-base flex flex-col items-center justify-center text-primary font-medium opacity-80"
          >
            [ Tampilan Dashboard Transaksi POS ]
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
