<script setup lang="ts">
import { useKasirDashboardPresenter } from "../presenters/useKasirDashboardPresenter";
import KasirRingkasanTab from "../components/kasir/KasirRingkasanTab.vue";
import KasirMejaTab from "../components/kasir/KasirMejaTab.vue";
import KasirMenuTab from "../components/kasir/KasirMenuTab.vue";
import KasirPesananTab from "../components/kasir/KasirPesananTab.vue";
import KasirProfilTab from "../components/kasir/KasirProfilTab.vue";

const {
  router,
  activeTab,
  loading,
  pesananHariIni,
  totalPesanan,
  totalPendapatan,
  totalDineIn,
  totalTakeaway,
  mejaList,
  toggleMeja,
  menuList,
  toggleMenu,
  logout,
} = useKasirDashboardPresenter();
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <!-- Header -->
    <header class="bg-white shadow sticky top-0 z-40">
      <div
        class="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center"
          >
            <i class="bx bx-user text-xl"></i>
          </div>
          <div>
            <h1 class="text-lg font-bold text-slate-800 leading-tight">
              Dashboard Kasir
            </h1>
            <p class="text-xs text-slate-400">
              Kelola meja, menu & lihat ringkasan hari ini
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="router.push('/kasir')"
            class="bg-secondary text-gray-800 px-4 py-2 rounded-xl hover:bg-[#c2aa96] transition shadow text-sm font-medium flex items-center gap-1.5"
          >
            POS
          </button>
          <button
            @click="logout"
            class="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/80 transition shadow text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Tab Nav -->
    <div
      class="border-b border-slate-200 bg-white sticky top-[73px] z-30 shadow-sm"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1">
        <button
          v-for="tab in [
            { id: 'ringkasan', label: 'Ringkasan' },
            { id: 'pesanan', label: 'Pesanan' },
            { id: 'meja', label: 'Meja' },
            { id: 'menu', label: 'Menu' },
            { id: 'profil', label: 'Profil' },
          ]"
          :key="tab.id"
          @click="activeTab = tab.id as any"
          :class="[
            'py-4 px-4 text-sm font-medium border-b-2 transition',
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 hover:text-slate-800',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <i class="bx bx-loader-alt bx-spin text-5xl text-primary"></i>
    </div>

    <main v-else class="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <KasirRingkasanTab
        v-if="activeTab === 'ringkasan'"
        :pesanan-hari-ini="pesananHariIni"
        :total-pesanan="totalPesanan"
        :total-pendapatan="totalPendapatan"
        :total-dine-in="totalDineIn"
        :total-takeaway="totalTakeaway"
      />

      <KasirPesananTab v-if="activeTab === 'pesanan'" />

      <KasirMejaTab
        v-if="activeTab === 'meja'"
        :meja-list="mejaList"
        @toggle="toggleMeja"
      />

      <KasirMenuTab
        v-if="activeTab === 'menu'"
        :menu-list="menuList"
        @toggle="toggleMenu"
      />

      <KasirProfilTab v-if="activeTab === 'profil'" />
    </main>
  </div>
</template>
