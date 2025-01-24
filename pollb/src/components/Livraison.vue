<script setup>

import Icon from './Icon.vue'

import {useRouter} from "vue-router";
import {useAddress} from "@/store/Address.js";

const router = useRouter();

const data = useAddress();

const a = JSON.parse(window.localStorage.getItem('addresses'))

const handleRed = () => {
  if (a) {
    console.log(a);
    router.push('/')
  }
  if (data.allAdrs.length === 0) {
    router.push('/order-checkout/address-form')
  } else {
    router.push('/order-checkout/address-selection')
  }
}

</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-5">Où l’expédier ?</h1>
    <div class="notice bg-[#FF9500] text-white text-xs rounded-lg py-2 px-3 flex items-center gap-3">
      <Icon class="pi-exclamation-circle"></Icon>
      En raison d’un grand nombre de commandes, nos délais de livraison habituels ont été étendus.
    </div>
    <div
        class="ship-type mt-10 border border-linkColor rounded-lg shadow-lg p-6 flex items-center justify-center flex-col cursor-pointer"
        @click="handleRed">
      <Icon class="pi-inbox !text-black !text-5xl mb-3"></Icon>
      <h1 class="text-base font-bold">Livraison Ã domicile</h1>
      <p class="mt-2 mb-2 text-linkColor text-xs">Jeudi 23 Janvier - Mardi 4 Février</p>
      <span class="text-green-400">Gratuite</span>
    </div>
  </div>
</template>

<style scoped>

</style>