<script setup>
import ProductItem from "@/components/ProductItem.vue";
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const data = ref([]);

onMounted(() => {
  const storedData = localStorage.getItem('acheter');
  data.value = storedData ? JSON.parse(storedData) : [];
});

const closeHistory = () => {
  router.go(-1);
};
</script>

<template>
  <div class="p-6 absolute top-2 bg-white z-20 right-2 w-[400px] h-[800px] ">
    <button
        @click="closeHistory"
        class="absolute top-2 right-2 text-black text-2xl font-bold hover:opacity-70"
    >
      ×
    </button>
    <h1 class="font-bold text-xl mb-5">Historique</h1>
    <div v-if="data.length" class="products grid grid-cols-1 gap-6 gap-8">
      <ProductItem
          v-for="prod in data"
          :key="prod.id"
          :product="prod"
      ></ProductItem>
    </div>
    <p v-else class="text-center text-gray-500">Aucun produit dans l'historique</p>
  </div>
</template>

<style scoped>
.products {
  max-height: calc(100% - 50px);
  overflow-y: auto;
}
</style>