<script setup lang="ts">
interface MenuItem {
  id: string;
  nama: string;
  harga: number;
  foto_url: string | null;
  tersedia: boolean;
  id_kategori: string | null;
  kategori?: { nama: string } | null;
}

const props = defineProps<{
  menuList: MenuItem[];
}>();

const emit = defineEmits<{
  (e: "toggle", item: MenuItem): void;
}>();
</script>

<template>
  <div
    v-if="props.menuList.length === 0"
    class="py-16 text-center text-slate-400"
  >
    <i class="bx bx-food-menu text-5xl mb-3 block"></i>
    Belum ada menu
  </div>

  <div
    v-else
    class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
  >
    <div class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">Daftar Menu</h2>
      <p class="text-xs text-slate-400 mt-0.5">
        Toggle untuk mengaktifkan / menonaktifkan menu di POS
      </p>
    </div>

    <div class="divide-y divide-slate-50">
      <div
        v-for="item in props.menuList"
        :key="item.id"
        class="flex items-center gap-4 px-5 py-3 hover:bg-slate-50/60 transition"
      >
        <!-- Thumbnail -->
        <div class="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden shrink-0">
          <img
            v-if="item.foto_url"
            :src="item.foto_url"
            class="w-full h-full object-cover"
          />
          <i
            v-else
            class="bx bx-image text-slate-300 text-xl w-full h-full flex items-center justify-center"
          ></i>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-slate-800 text-sm truncate">
            {{ item.nama }}
          </p>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-xs text-primary font-medium">
              Rp {{ item.harga.toLocaleString("id-ID") }}
            </span>
            <span
              v-if="item.kategori"
              class="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded"
            >
              {{ (item.kategori as any).nama }}
            </span>
          </div>
        </div>

        <!-- Toggle switch -->
        <button
          @click="emit('toggle', item)"
          :class="[
            'relative w-12 h-6 rounded-full transition-colors shrink-0',
            item.tersedia ? 'bg-success' : 'bg-slate-200',
          ]"
        >
          <span
            :class="[
              'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all',
              item.tersedia ? 'left-[calc(100%-1.375rem)]' : 'left-0.5',
            ]"
          ></span>
        </button>

        <!-- Label -->
        <span
          :class="[
            'text-xs font-medium w-20 text-right shrink-0',
            item.tersedia ? 'text-success' : 'text-slate-400',
          ]"
        >
          {{ item.tersedia ? "Tersedia" : "Nonaktif" }}
        </span>
      </div>
    </div>
  </div>
</template>
