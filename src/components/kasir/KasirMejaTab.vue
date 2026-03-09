<script setup lang="ts">
interface Meja {
  id: string;
  nomor_meja: string;
  status: string;
}

const props = defineProps<{
  mejaList: Meja[];
}>();

const emit = defineEmits<{
  (e: "toggle", meja: Meja): void;
}>();
</script>

<template>
  <div
    v-if="props.mejaList.length === 0"
    class="py-16 text-center text-slate-400"
  >
    <i class="bx bx-table text-5xl mb-3 block"></i>
    Belum ada meja
  </div>

  <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    <button
      v-for="meja in props.mejaList"
      :key="meja.id"
      @click="emit('toggle', meja)"
      :class="[
        'relative bg-white rounded-2xl p-5 flex flex-col items-center gap-3 border-2 transition-all shadow-sm hover:shadow-md',
        meja.status === 'tersedia'
          ? 'border-success hover:border-success/70'
          : 'border-danger hover:border-danger/70',
      ]"
    >
      <!-- Status dot -->
      <div
        :class="[
          'w-3 h-3 rounded-full absolute top-3 right-3',
          meja.status === 'tersedia' ? 'bg-success' : 'bg-danger',
        ]"
      ></div>

      <i class="bx bx-table text-4xl text-slate-400"></i>
      <div class="text-center">
        <p class="font-bold text-slate-800 text-lg">
          Meja {{ meja.nomor_meja }}
        </p>
        <span
          :class="[
            'text-xs font-semibold px-2 py-0.5 rounded-full',
            meja.status === 'tersedia'
              ? 'bg-success/15 text-success'
              : 'bg-danger/15 text-danger',
          ]"
        >
          {{ meja.status === "tersedia" ? "Tersedia" : "Terisi" }}
        </span>
      </div>
      <p class="text-xs text-slate-400">Ketuk untuk ubah status</p>
    </button>
  </div>
</template>
