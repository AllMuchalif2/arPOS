<script setup lang="ts">
import { useAdminMejaTab } from "../../composables/useAdminMejaTab";

const p = useAdminMejaTab();
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Manajemen Meja Pelanggan</h2>
      <button
        @click="p.openAddModal()"
        class="bg-primary text-white px-4 py-2 rounded-xl hover:bg-[#c99188] transition shadow"
      >
        <i class="bx bx-plus mr-1"></i> Tambah Meja
      </button>
    </div>

    <div v-if="p.loading.value" class="flex justify-center p-12">
      <i class="bx bx-loader-alt bx-spin text-4xl text-primary"></i>
    </div>

    <div
      v-else
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <table class="w-full" v-if="p.mejaList.value.length > 0">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th
              class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12"
            >
              No
            </th>
            <th
              class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Nama Meja
            </th>
            <th
              class="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              URL Slug
            </th>
            <th
              class="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-36"
            >
              Status
            </th>
            <th
              class="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider w-36"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="(m, i) in p.mejaList.value"
            :key="m.id"
            class="hover:bg-gray-50/70 transition-colors"
          >
            <td class="px-5 py-3.5 text-sm text-gray-400 font-medium">
              {{ i + 1 }}
            </td>
            <td class="px-5 py-3.5">
              <span class="text-sm font-semibold text-gray-800">{{
                m.nomor_meja
              }}</span>
            </td>
            <td class="px-5 py-3.5">
              <code
                class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg font-mono"
              >
                /menu/…/{{
                  m.nomor_meja
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")
                }}
              </code>
            </td>
            <td class="px-5 py-3.5 text-center">
              <button
                @click="p.toggleStatus(m.id, m.status || 'tersedia')"
                :title="
                  m.status === 'terisi' ? 'Klik → Tersedia' : 'Klik → Terisi'
                "
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all hover:brightness-90 active:scale-95',
                  m.status === 'terisi'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-emerald-100 text-emerald-700',
                ]"
              >
                <span
                  :class="[
                    'w-1.5 h-1.5 rounded-full',
                    m.status === 'terisi' ? 'bg-red-500' : 'bg-emerald-500',
                  ]"
                ></span>
                {{ m.status === "terisi" ? "Terisi" : "Tersedia" }}
              </button>
            </td>
            <td class="px-5 py-3.5 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button
                  @click="p.openQrModal(m)"
                  class="flex-1 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                  title="Cetak QR"
                >
                  QR
                </button>
                <button
                  @click="p.openEditModal(m)"
                  class="flex-1 py-2 px-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition text-sm font-medium"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  @click="p.deleteMeja(m.id)"
                  class="flex-1 py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                  title="Hapus"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="text-center p-12">
        <i class="bx bx-table text-5xl text-gray-300 mb-3 block"></i>
        <h3 class="text-gray-500 font-medium">Belum ada data meja</h3>
        <p class="text-gray-400 text-sm mt-1">
          Klik 'Tambah Meja' untuk menambahkan
        </p>
      </div>
    </div>

    <!-- Modal Form -->
    <div
      v-if="p.showModal.value"
      class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">
            {{ p.isEditing.value ? "Edit Meja" : "Tambah Meja" }}
          </h2>
          <button
            @click="p.showModal.value = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="bx bx-x text-2xl"></i>
          </button>
        </div>

        <form @submit.prevent="p.saveMeja()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Identitas/Nomor Meja</label
            >
            <input
              v-model="p.form.value.nomor_meja"
              type="text"
              required
              placeholder="Contoh: Meja 01, VIP 1"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Status</label
            >
            <select
              v-model="p.form.value.status"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none transition bg-white"
            >
              <option value="tersedia">Tersedia</option>
              <option value="terisi">Terisi</option>
            </select>
          </div>
          <div class="pt-4 flex gap-3">
            <button
              type="button"
              @click="p.showModal.value = false"
              class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="p.formLoading.value"
              class="flex-1 py-3 bg-primary hover:bg-[#c99188] text-white rounded-xl transition font-medium flex justify-center items-center"
            >
              <i
                v-if="p.formLoading.value"
                class="bx bx-loader-alt bx-spin mr-2"
              ></i>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- QR Preview Modal -->
    <div
      v-if="p.showQrModal.value && p.qrMeja.value"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click.self="p.showQrModal.value = false"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-xs shadow-2xl overflow-hidden"
      >
        <!-- Preview Card -->
        <div class="p-8 flex flex-col items-center text-center bg-white">
          <p
            class="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1"
          >
            {{ p.namaToko.value }}
          </p>
          <h2 class="text-3xl font-extrabold text-gray-900 mb-5">
            {{ p.qrMeja.value.nomor_meja }}
          </h2>
          <img
            :src="p.qrDataUrl.value"
            class="w-52 h-52 rounded-xl shadow-sm"
            alt="QR Code"
          />
          <p class="mt-4 text-xs text-gray-400">Scan untuk memesan</p>
        </div>

        <!-- Actions -->
        <div class="px-6 pb-6 flex gap-3">
          <button
            @click="p.showQrModal.value = false"
            class="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium text-sm"
          >
            Tutup
          </button>
          <button
            @click="p.printQr()"
            class="flex-1 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/80 transition font-semibold text-sm flex items-center justify-center gap-2"
          >
            <i class="bx bx-printer"></i> Cetak
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
