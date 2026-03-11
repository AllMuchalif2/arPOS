<script setup lang="ts">
import { useLoginPresenter } from "../presenters/useLoginPresenter";

const { email, password, loading, errorMsg, handleLogin } = useLoginPresenter();
</script>

<template>
  <div
    class="min-h-screen bg-base flex justify-center items-center p-4 font-sans relative"
  >
    <!-- Back to Home -->
    <router-link
      to="/"
      class="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm"
    >
      <i class="bx bx-left-arrow-alt text-xl"></i>
      Kembali ke Beranda
    </router-link>

    <div
      class="w-full max-w-md bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div class="text-center mb-8">
        <img
          src="/arpos-logo.png"
          alt="arPOS Logo"
          class="w-16 h-16 rounded-lg mx-auto"
        />
        <h1 class="text-2xl font-bold text-gray-800">
          ar<span class="text-primary">POS</span>
        </h1>
        <p class="text-sm text-gray-500 mt-2">Sign in to your POS Dashboard</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="bx bx-envelope text-gray-400 text-lg"></i>
            </div>
            <input
              v-model="email"
              type="email"
              required
              class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
              placeholder="admin@cafe.com"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="bx bx-lock-alt text-gray-400 text-lg"></i>
            </div>
            <input
              v-model="password"
              type="password"
              required
              class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div
          v-if="errorMsg"
          class="p-3 rounded-lg bg-danger/10 text-danger text-sm py-2 flex items-center gap-2"
        >
          <i class="bx bx-error-circle text-lg"></i>
          <span>{{ errorMsg }}</span>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-primary hover:bg-[#c99188] text-white font-medium py-3 rounded-xl transition-colors duration-200 flex justify-center items-center shadow-md shadow-primary/20 mt-2"
        >
          <i v-if="loading" class="bx bx-loader-alt bx-spin text-xl mr-2"></i>
          {{ loading ? "Signing in..." : "Sign In" }}
        </button>

        <p
          class="text-center flex justify-center text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100"
        >
          Belum punya toko?
          <router-link
            to="/#register"
            class="text-primary font-semibold hover:underline ml-1"
          >
            Daftar di sini
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
