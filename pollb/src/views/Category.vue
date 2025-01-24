<template>
  <div class="products">
    <product-item v-for="prod in products" :key="prod.id" :product="prod"
      @open-ajouter-panier-panel="onOpenAjouterPanierPanel"></product-item>
    <ajouter-panier v-if="AjouterPanierPanelOpen" :AjouterPanierPanelOpen="AjouterPanierPanelOpen"
      @update:open="onOpenAjouterPanierPanel" :products="products" />
  </div>
</template>

<script setup>
import AjouterPanier from '@/components/AjouterPanier.vue';
import ProductItem from '@/components/ProductItem.vue';
import { ref } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

let AjouterPanierPanelOpen = ref(false);

const onOpenAjouterPanierPanel = (isOpen) => {
  AjouterPanierPanelOpen.value = isOpen;
};
</script>