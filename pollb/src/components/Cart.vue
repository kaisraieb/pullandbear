<template>
  <div class="bg-white absolute w-[400px] overflow-x-hidden overflow-y-hidden h-[90vh] right-5 top-5 rounded-lg">
    <div class="top-cart-div flex items-center justify-between pt-4 px-6 pb-0 shadow-lg">
      <button class="font-bold border-b-2 pb-4" :class="{ 'border-black': openedPanier }"
              @click="openedPanierHandler">Panier({{ data.getAddedProductsCount }})
      </button>
      <button class="font-bold border-b-2 pb-4" :class="{ 'border-black': openedWhishlist }"
              @click="openedWhishlistHandler">Whishlist({{ data.getFavoriteProductsCount }})
      </button>
      <button disabled class="text-gray-400">
        <Icon class="pi-pencil !text-black"></Icon>
      </button>
      <div class="close-btn cursor-pointer p-1.5" @click="closeCartPenel">
        <Icon class="pi-times text-sm !text-black"/>
      </div>
    </div>
    <div v-if="data.getFavoriteProductsCount !== 0 && openedWhishlist"
         class="grid grid-cols-2 gap-0.5 gap-y-3 overflow-y-scroll" style="height: calc(100% - 65px);">
      <div v-for="prod in data.favoriteProducts" :key="prod.id">
        <img :src="prod.img1" :alt="prod.name" class="h-[260px] w-full">
        <div class="infos flex flex-col">
          <p class="pl-5 pt-2 text-sm">{{ prod.name }}</p>
          <p class="font-bold pl-5 text-sm">{{ prod.price }} TND</p>
          <button class="w-[90%] border rounded-md m-auto text-sm mt-3 hover:bg-black hover:text-white"
                  @click="handleFromFavToAdd(prod)">
            Ajouter à mon panier d’achat
          </button>
        </div>
      </div>
    </div>
    <div v-if="data.getAddedProductsCount !== 0 && openedPanier && !openedWhishlist"
         class="overflow-y-scroll h-full p-2.5 flex flex-col gap-3 pb-5" style="height: calc(100% - 65px);">
      <div v-for="product in data.addedProducts" :key="product.id">
        <div class="flex items-start gap-3 border-b border-linkColor pb-3 relative">
          <div class="product-img w-[100px] h-[150px]">
            <img :src="product.img1" :alt="product.name" class="max-w-full h-[150px]">
          </div>
          <div class="product-infos flex flex-col flex-1 h-full justify-between">
            <div class="infos flex-1 w-full">
              <p>{{ product.name }}</p>
              <p>{{ product.price }} TND</p>
            </div>
            <div class="tools absolute bottom-3 right-3 flex gap-3">
              <button class="text-linkColor" @click="handleFavorite(product)">
                <Icon class="pi-heart !text-black"></Icon>
              </button>
              <button class="!text-black">
                <Icon class="pi-pencil !text-black"></Icon>
              </button>
              <button class="text-black">
                <Icon class="pi-trash !text-black" @click="handleTrash(product)"></Icon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-checkout absolute bottom-4 left-0 w-full flex flex-col" v-if="data.getAddedProductsCount !== 0">
        <div class="total px-6 py-4 border-t border-linkColor flex items-center justify-between">
          <p class=""><span class="font-bold">Total</span> <span class="text-xs">TVA comprise</span></p>
          <span class="font-bold">{{ data.getTotalPrice }} TND</span>
        </div>
        <div class="btn">
          <button @click="handleCommandRoute" class="w-[90%] rounded-3xl bg-green-500 text-white py-3 ml-3 mr-3">
            Traiter Commande
          </button>
        </div>
      </div>
    </div>
    <div v-if="data.getAddedProductsCount === 0"
         class="flex items-center justify-center h-full text-center p-8 font-bold">
      Ton panier est vide. Pourquoi ne pas l’essayer avec l’une de nos suggestions ?
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import Icon from './Icon.vue';
import {useAddProductsStore} from '@/store/addProducts';

import { useRouter } from "vue-router";

const router = useRouter()

const data = useAddProductsStore();

const cartOpenProps = defineProps({
  cartOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:cartOpen']);

const closeCartPenel = () => {
  emit('update:cartOpen', false);
};

const openedPanier = ref(false);
const openedWhishlist = ref(false);

onMounted(() => {
  openedPanier.value = true;
});

const handleFavorite = (product) => {
  data.addFavoriteProduct(product);
  data.removeAddedProduct(product);
};

const handleTrash = (product) => {
  data.removeAddedProduct(product);
};

const openedWhishlistHandler = () => {
  openedPanier.value = false;
  openedWhishlist.value = true;
};

const openedPanierHandler = () => {
  openedPanier.value = true;
  openedWhishlist.value = false;
};

const handleFromFavToAdd = (prod) => {
  data.addAddedProduct(prod);
  data.removeFavoriteProduct(prod);
};

const handleCommandRoute = () => {
  router.push({path:"/order-checkout"});
}
</script>