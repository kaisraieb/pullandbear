<template>
  <div class="fixed top-0 left-0 w-full bg-white h-screen" style="z-index: -1;">
    <div class="search-content w-full h-full absolute top-[87.9px] left-0">
      <div class="input-grp px-6 relative">
        <label for="search-inp" class="absolute top-1/2 left-6 transform -translate-y-1/2">
          <Icon class="pi-search !text-black !text-xl"></Icon>
        </label>
        <!-- Bind the input to the searchTerm using v-model -->
        <input
            type="search"
            placeholder="Search Here..."
            id="search-inp"
            class="w-full text-xl pl-10 py-4 outline-none border-b-2 border-linkColor"
            v-model="searchTerm"
        >
      </div>

      <div class="filtredProducts px-6 mt-6">
        <h1 class="text-2xl font-semibold">Recommandé pour toi</h1>
        <div class="products mt-6 grid grid-cols-4 gap-3 overflow-y-scroll h-[600px]">
          <!-- Use the filteredProducts array in the v-for loop -->
          <product-item
              v-for="prod in filteredProducts"
              :key="prod.id"
              :product="prod"
              @open-ajouter-panier-panel="onOpenAjouterPanierPanel"
          ></product-item>

          <ajouter-panier
              v-if="AjouterPanierPanelOpen"
              :AjouterPanierPanelOpen="AjouterPanierPanelOpen"
              @update:open="onOpenAjouterPanierPanel"
              :products="data.products"
              class="!top-12"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useAddProductsStore} from '@/store/addProducts';
import Icon from './Icon.vue';
import ProductItem from './ProductItem.vue';
import AjouterPanier from '@/components/AjouterPanier.vue';
import {ref, computed} from 'vue';

const data = useAddProductsStore();

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

let AjouterPanierPanelOpen = ref(false);

// The searchTerm will hold the value typed in the search input
const searchTerm = ref('');

// Computed property to filter products based on the searchTerm
const filteredProducts = computed(() => {
  // Check if the searchTerm is not empty and filter based on product name
  return data.products.filter(prod =>
      prod.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const onOpenAjouterPanierPanel = (isOpen) => {
  AjouterPanierPanelOpen.value = isOpen;
};
</script>
