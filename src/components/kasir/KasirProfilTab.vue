<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore";
import { useChangePassword } from "../../composables/useChangePassword";

const auth = useAuthStore();
const cp = useChangePassword();
</script>

<template>
  <div class="space-y-6 max-w-2xl mx-auto pb-12">
    <div>
      <h2 class="text-xl font-bold text-gray-800">Profil Saya</h2>
      <p class="text-sm text-gray-500 mt-1">
        Kelola informasi akun dan keamanan Anda.
      </p>
    </div>

    <!-- Akun Info -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div class="flex items-center gap-4 mb-6">
        <div
          class="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold"
        >
          {{ auth.profile?.nama?.charAt(0) || "K" }}
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-800">
            {{ auth.profile?.nama || "Kasir" }}
          </h3>
          <p class="text-gray-500 text-sm capitalize">
            Role: {{ auth.profile?.role }}
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
            >Email</label
          >
          <div class="flex items-center gap-2 text-gray-700 font-medium">
            <i class="bx bx-envelope text-gray-400"></i>
            {{ auth.user?.email }}
          </div>
        </div>
      </div>
    </div>

    <!-- Password Change Section -->
    <div class="pt-6">
      <h2 class="text-xl font-bold text-gray-800">Keamanan Akun</h2>
      <p class="text-sm text-gray-500 mt-1">
        Ganti password Anda secara berkala.
      </p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <form @submit.prevent="cp.changePassword()" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password Baru</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <i class="bx bx-lock-alt text-gray-400 text-lg"></i>
              </div>
              <input
                v-model="cp.newPassword.value"
                type="password"
                required
                placeholder="Minimal 6 karakter"
                class="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary outline-none transition text-gray-800 font-medium"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Konfirmasi Password Baru</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <i class="bx bx-check-shield text-gray-400 text-lg"></i>
              </div>
              <input
                v-model="cp.confirmPassword.value"
                type="password"
                required
                placeholder="Ulangi password baru"
                class="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary outline-none transition text-gray-800 font-medium"
              />
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <button
            type="submit"
            :disabled="cp.isUpdating.value"
            class="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl transition font-medium flex justify-center items-center shadow-sm"
          >
            <i
              v-if="cp.isUpdating.value"
              class="bx bx-loader-alt bx-spin mr-2"
            ></i>
            <i v-else class="bx bx-key mr-2"></i>
            {{ cp.isUpdating.value ? "Memperbarui..." : "Ganti Password" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
