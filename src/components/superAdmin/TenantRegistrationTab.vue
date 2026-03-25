<script setup lang="ts">
import { useTenantRegistrationPresenter } from "../../presenters/useTenantRegistrationPresenter";
import { swalSuccess } from "../../composables/useSwal";

const p = useTenantRegistrationPresenter();

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text);
    swalSuccess("Tersalin!", `${label} berhasil disalin.`);
  } catch (err) {
    console.error("Gagal menyalin", err);
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">
        Antrean Pendaftaran Tenant
      </h2>
      <button
        @click="p.fetchRegistrations()"
        class="p-2 text-slate-500 hover:text-info transition rounded-full hover:bg-info/10"
      >
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Info Credentials Sementara -->
    <div
      v-if="p.newTenantCreds.value"
      class="p-4 bg-success/10 text-success rounded-xl border border-success/20 shadow-sm"
    >
      <div
        class="bg-white p-4 rounded-lg border border-success/20 text-sm shadow-sm"
      >
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <p class="text-slate-500 m-0">
            <i class="bx bx-info-circle mr-1 align-middle text-success"></i>
            <span class="align-middle font-medium">Beri tahu pendaftar detail akun mereka:</span>
          </p>
          <button
            @click="copyToClipboard(`Email: ${p.newTenantCreds.value?.email}\nPassword: ${p.newTenantCreds.value?.password}`, 'Info Akun')"
            class="text-xs flex items-center gap-1.5 bg-success text-white hover:bg-success-dark px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95 font-medium ml-auto sm:ml-0"
            title="Salin semua kredensial"
          >
            <i class="bx bx-copy"></i>
            Salin Info
          </button>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div>
            <span class="text-slate-400 text-xs uppercase tracking-wider block mb-1">Email Admin</span>
            <div class="flex items-center gap-2 group">
              <span class="font-medium text-slate-800 flex items-center gap-2">
                <i class="bx bx-envelope text-slate-400"></i>
                {{ p.newTenantCreds.value.email }}
              </span>
              <button @click="copyToClipboard(p.newTenantCreds.value?.email || '', 'Email')" class="text-slate-400 hover:text-primary transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100" title="Salin Email">
                <i class="bx bx-copy"></i>
              </button>
            </div>
          </div>
          <div class="h-px sm:h-auto sm:w-px bg-slate-100"></div>
          <div>
            <span class="text-slate-400 text-xs uppercase tracking-wider block mb-1">Password Sementara</span>
            <div class="flex items-center gap-2 group">
              <span class="font-mono font-medium text-slate-800 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded flex items-center gap-2">
                <i class="bx bx-lock-alt text-slate-400"></i>
                {{ p.newTenantCreds.value.password }}
              </span>
              <button @click="copyToClipboard(p.newTenantCreds.value?.password || '', 'Password')" class="text-slate-400 hover:text-primary transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100" title="Salin Password">
                <i class="bx bx-copy"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div
      class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="p-4 font-semibold text-slate-600 text-sm">
                Tanggal Daftar
              </th>
              <th class="p-4 font-semibold text-slate-600 text-sm">
                Nama Toko
              </th>
              <th class="p-4 font-semibold text-slate-600 text-sm">Kontak</th>
              <th class="p-4 font-semibold text-slate-600 text-sm">Status</th>
              <th class="p-4 font-semibold text-slate-600 text-sm text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="p.loading.value">
              <td colspan="5" class="p-8 text-center text-slate-500">
                Memuat data...
              </td>
            </tr>
            <tr v-else-if="p.registrations.value.length === 0">
              <td colspan="5" class="py-12">
                <div
                  class="flex flex-col items-center justify-center text-slate-500"
                >
                  <svg
                    class="w-12 h-12 text-slate-300 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span>Belum ada antrean pendaftar tenant.</span>
                </div>
              </td>
            </tr>
            <tr
              v-else
              v-for="reg in p.registrations.value"
              :key="reg.id"
              class="hover:bg-slate-50 transition-colors"
            >
              <td class="p-4 text-sm text-slate-600 whitespace-nowrap">
                {{ p.formatDate(reg.created_at) }}
              </td>
              <td class="p-4">
                <div class="font-medium text-slate-900">
                  {{ reg.store_name }}
                </div>
              </td>
              <td class="p-4">
                <div class="text-sm text-slate-900 font-medium">
                  {{ reg.email }}
                </div>
                <div
                  class="text-xs text-slate-500 flex items-center gap-1 mt-0.5"
                >
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  {{ reg.phone }}
                </div>
              </td>
              <td class="p-4">
                <span
                  v-if="reg.status === 'pending'"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning"
                >
                  Menunggu ACC
                </span>
                <span
                  v-else-if="reg.status === 'approved'"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/20 text-success"
                >
                  Diterima
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-danger/20 text-danger"
                >
                  Ditolak
                </span>
              </td>
              <td class="p-4">
                <div
                  class="flex gap-2 justify-center"
                  v-if="reg.status === 'pending'"
                >
                  <button
                    @click="p.approveTenant(reg.id, reg.store_name)"
                    :disabled="p.processingId.value !== null"
                    class="flex-1 py-1.5 px-3 bg-info text-info-600 rounded-lg hover:bg-info hover:text-white transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Terima & Buat Akun"
                  >
                    Terima
                  </button>
                  <button
                    @click="p.rejectTenant(reg.id, reg.store_name)"
                    :disabled="p.processingId.value !== null"
                    class="flex-1 py-1.5 px-3 bg-danger text-danger-600 rounded-lg hover:bg-danger hover:text-white transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Tolak"
                  >
                    Tolak
                  </button>
                </div>
                <div v-else class="text-center text-slate-400 text-sm">-</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
