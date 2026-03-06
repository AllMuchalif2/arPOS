<script setup lang="ts">
import { useAdminPresenter } from "../presenters/useAdminPresenter";

const {
  router,
  isInstallable,
  installApp,
  products,
  loading,
  showModal,
  newProduct,
  isUploading,
  handleFileChange,
  saveProduct,
  deleteProduct,
  logout,
} = useAdminPresenter();
</script>

<template>
  <div class="min-h-screen bg-base p-6 font-sans">
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p class="text-gray-500 text-sm">Manage your products</p>
      </div>
      <div class="flex gap-4 items-center">
        <button
          v-if="isInstallable"
          @click="installApp"
          class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Install App
        </button>
        <button
          @click="showModal = true"
          class="bg-primary text-white px-4 py-2 rounded-xl hover:bg-[#c99188] transition shadow"
        >
          <i class="bx bx-plus mr-1"></i> Add Product
        </button>
        <button
          @click="router.push('/')"
          class="bg-secondary text-gray-800 px-4 py-2 rounded-xl hover:bg-[#c2aa96] transition shadow"
        >
          POS Cashier
        </button>
        <button
          @click="logout"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition shadow"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Product Grid -->
    <div v-if="loading" class="flex justify-center p-12">
      <i class="bx bx-loader-alt bx-spin text-4xl text-primary"></i>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="p in products"
        :key="p.id"
        class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col"
      >
        <div
          class="h-40 w-full rounded-xl bg-gray-100 mb-4 overflow-hidden relative"
        >
          <img
            v-if="p.foto_url"
            :src="p.foto_url"
            class="w-full h-full object-cover"
          />
          <i
            v-else
            class="bx bx-image text-gray-300 text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          ></i>
        </div>
        <h3 class="font-bold text-gray-800">{{ p.nama }}</h3>
        <p class="text-primary font-medium mt-1">
          Rp {{ p.harga.toLocaleString("id-ID") }}
        </p>
        <div class="mt-auto pt-4 flex gap-2">
          <button
            @click="deleteProduct(p.id)"
            class="w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="products.length === 0"
        class="col-span-full text-center p-12 bg-white rounded-2xl border border-gray-100"
      >
        <i class="bx bx-package text-5xl text-gray-300 mb-3"></i>
        <h3 class="text-gray-500 font-medium">No products found</h3>
        <p class="text-gray-400 text-sm mt-1">
          Click 'Add Product' to create one
        </p>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Add New Product</h2>
          <button
            @click="showModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="bx bx-x text-2xl"></i>
          </button>
        </div>

        <form @submit.prevent="saveProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Product Name</label
            >
            <input
              v-model="newProduct.nama"
              type="text"
              required
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Price (Rp)</label
            >
            <input
              v-model.number="newProduct.harga"
              type="number"
              required
              min="0"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none transition"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Product Photo</label
            >
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <p class="text-xs text-gray-500 mt-1">
              Images will automatically be compressed.
            </p>
          </div>

          <div class="pt-4 flex gap-3">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isUploading"
              class="flex-1 py-3 bg-primary hover:bg-[#c99188] text-white rounded-xl transition font-medium flex justify-center items-center"
            >
              <i v-if="isUploading" class="bx bx-loader-alt bx-spin mr-2"></i>
              {{ isUploading ? "Saving..." : "Save Product" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
