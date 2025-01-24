<template>
  <Teleport to="#modal-target">
    <Transition name="menu">
      <div v-show="AjouterPanierPanelOpen"
        class="ajouter-panier z-50 fixed top-10 right-10 bg-white shadow-lg w-[400px] rounded-lg">
        <div class="close-btn absolute -top-5 -right-4 cursor-pointer bg-white shadow-lg p-1.5 rounded-full "
          @click="closeAjouterPanierPanel">
          <Icon class="pi-times text-sm !text-black" />
        </div>
        <div class="top-ajout-panel w-full flex justify-center items-center mb-5">
          <p class="text-white text-lg bg-green-500 w-full p-4 rounded-t-lg font-bold">Ajouté au panier d’achat</p>
        </div>
        <div class="voir-panier mb-5">
          <button
            class="w-11/12 m-auto bg-black text-white flex items-center justify-center font-bold py-3 rounded-full"
            @click="voirPanier">
            Voir panier d'achat ({{ addedProducts.length }})
          </button>
        </div>
      </div>
    </Transition>
    <Transition name="menu">
      <div v-show="AjouterPanierPanelOpen"
        class="overlay z-20 w-full fixed right-0 top-0 h-screen bg-black bg-opacity-35"></div>
    </Transition>
  </Teleport>
</template>

<script setup>
import Icon from './Icon.vue';
import { useAddProductsStore } from '@/store/addProducts';
import { ref } from 'vue';

const emit = defineEmits(['update:open']);
let cartOpened = ref(false);

const props = defineProps({
  AjouterPanierPanelOpen: {
    type: Boolean,
    required: true,
  },
});

const closeAjouterPanierPanel = () => {
  cartOpened.value = true;
  emit('update:open', false);
};

const data = useAddProductsStore();

const addedProducts = data.addedProducts;


const voirPanier = () => {
  closeAjouterPanierPanel();
}


</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>