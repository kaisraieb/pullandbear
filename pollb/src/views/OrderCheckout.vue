<script setup>

import Icon from "@/components/Icon.vue";
import {useAddProductsStore} from "@/store/addProducts.js";
import {useRouter, useRoute} from "vue-router";
import {onMounted} from "vue";

const data = useAddProductsStore();

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (data.getAddedProductsCount === 0) {
    router.push("/");
  } else if(window.localStorage.getItem('isLogin')) {
    router.push("/order-checkout/shipping-types");
  }
  else {
    router.push("/order-checkout/donnees");
  }
})

const checkRoutesForStyling1 = route.fullPath.includes('paiement');

</script>

<template>
  <div class="flex h-screen">
    <div class="left-panel w-full p-6">
      <div class="top-left-menu flex justify-start items-center mb-5">
        <div class="goback-btn cursor-pointer" @click="router.back()">
          <Icon class="pi-arrow-left !text-black"></Icon>
        </div>
        <div class="logo flex-1 flex justify-center items-center">
          <img src="/logo_pull_black_new.svg" class="h-7 w-44">
        </div>
      </div>
      <div v-if="!(useRoute().fullPath.includes('summary') || useRoute().fullPath.includes('commande-confirme'))"
           class="timeline flex items-center justify-center gap-4">
        <div class="timeline-item flex items-center gap-2">
          <span class="bg-black text-white text-sm flex items-center justify-center rounded-full w-6 h-6">1</span>
          <span>Données</span>
        </div>
        <div class="separator h-[2px] bg-gray-400 flex-1 w-full"
             :class="{ '!bg-black': route.fullPath.includes('shipping-types') || route.fullPath.includes('address-selection') || route.fullPath.includes('address-form') || route.fullPath.includes('paiement') }"></div>
        <div class="timeline-item flex items-center gap-2">
          <span
              class="bg-transparent text-gray-400 border-2 text-sm flex items-center justify-center rounded-full w-6 h-6"
              :class="{ '!bg-black !text-white': route.fullPath.includes('shipping-types') || route.fullPath.includes('address-selection') || route.fullPath.includes('address-form') || route.fullPath.includes('paiement') }">2</span>
          <span class="text-gray-400"
                :class="{ '!text-black': route.fullPath.includes('shipping-types') || route.fullPath.includes('address-selection') || route.fullPath.includes('address-form') || route.fullPath.includes('paiement') }">Livraison</span>
        </div>
        <div class="separator h-[2px] bg-gray-400 flex-1 w-full"
             :class="{ '!bg-black': route.fullPath.includes('paiement') }"></div>
        <div class="timeline-item flex items-center gap-2">
          <span :class="{ '!bg-black !text-white': route.fullPath.includes('paiement') }"
                class="bg-transparent border-2 text-gray-400 text-sm flex items-center justify-center rounded-full w-6 h-6">3</span>
          <span class="text-gray-400"
                :class="{ '!text-black': route.fullPath.includes('paiement') }">Paiement</span>
        </div>
      </div>
      <router-view class="mx-auto mt-16"></router-view>
    </div>
    <div class="right-panel bg-[#F6F6F6] w-[450px] p-6 relative">
      <h1 class="font-semibold text-sm mx-2 border-b-2 pb-4 mb-5 border-linkColor"> {{
          route.fullPath.includes('commande-confirme') ? 'Résumé de l’achat' : data.getAddedProductsCount + ' articles achetes'
        }}</h1>
      <div class="products grid grid-cols-1 gap-4">
        <div class="flex items-start gap-4" v-for="prod in data.addedProducts" :key="prod.id">
          <img :src="prod.img1" class="w-[90px] h-[135px]" :alt="prod.name">
          <div class="infos">
            <p class="text-sm">{{ prod.name }}</p>
            <p class="text-xs my-2 font-bold">{{ prod.price }} TND</p>
            <p class="text-xs text-gray-400">{{ prod.qte }} unité</p>
          </div>
        </div>
      </div>
      <div class="btn-checkout absolute bottom-4 left-0 w-full flex flex-col" v-if="data.getAddedProductsCount !== 0">
        <div class="total px-6 py-4 border-t border-linkColor flex items-center justify-between">
          <p class=""><span class="font-bold">Total</span> <span class="text-xs">TVA comprise</span></p>
          <span class="font-bold">{{ data.getTotalPrice }} TND</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>