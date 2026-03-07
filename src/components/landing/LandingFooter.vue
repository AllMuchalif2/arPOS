<template>
  <footer class="bg-base py-10 border-t border-secondary">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <div class="flex items-center gap-2">
        <img
          src="/arpos-logo.png"
          alt="arPOS Logo"
          class="w-8 h-8 rounded-lg"
        />

        <span class="font-bold text-gray-900"
          >ar<span class="text-primary">POS</span></span
        >
      </div>
      <p class="text-gray-500 text-sm">
        © {{ new Date().getFullYear() }} arPOS. Hak Cipta Dilindungi.
      </p>
      <div class="flex gap-4 text-sm font-medium text-gray-600">
        <a href="#" class="hover:text-primary transition-colors"
          >Pusat Bantuan</a
        >
        <a href="#" class="hover:text-primary transition-colors"
          >Kebijakan Privasi</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
