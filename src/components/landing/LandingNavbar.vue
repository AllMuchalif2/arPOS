<template>
  <header class="bg-base shadow-sm sticky top-0 z-50">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <img src="/veepos.png" alt="veePOS Logo" class="w-8 h-8 rounded-lg" />
        <span class="text-xl font-bold text-gray-900 tracking-tight">
          veePOS
        </span>
      </div>
      <div class="flex items-center gap-4">
        <router-link
          to="/login"
          class="text-gray-600 hover:text-primary font-medium transition-colors"
          >Login</router-link
        >
        <a
          href="#register"
          class="bg-primary hover-bg-primary text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm"
          >Registrasi</a
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
