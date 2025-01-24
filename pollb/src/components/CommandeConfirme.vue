<script setup>

import Icon from "@/components/Icon.vue";
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 w-full">
    <div class="top border-b pb-5 w-full border-linkColor flex items-center justify-center flex-col gap-2">
      <img src="/order-complete.svg" alt="">
      <h1 class="text-5xl font-bold text-green-500">Commande terminée</h1>
      <p class="text-xs">Merci !</p>
      <p class="font-bold text-xs">Nº de commande 20158813820</p>
      <p class="text-xs">Nous vous préviendrons lorsqu’elle quittera l’entrepôt</p>
    </div>
    <div class="flex items-start w-full p-6 justify-start flex-col gap-2">
      <h1 class="font-bold mb-10">Données de livraison</h1>
      <div class="liv1 flex items-start gap-4">
        <Icon class="!text-black pi-calendar"></Icon>
        <div class="flex flex-col gap-1">
          <h1 class="font-bold">Livraison estimée</h1>
          <p class="text-green-500 text-xs">Jeudi 06/02</p>
          <p class="text-sm text-linkColor">LIVRAISON À DOMICILE</p>
        </div>

      </div>
      <div class="timeline1 w-full flex items-center my-5">
        <div class="1 relative">
          <Icon class="!text-white bg-green-500 p-3 rounded-full text-xs pi-check"></Icon>
          <div class=" absolute -bottom-5 w-52 -left-10 text-green-400 text-xs font-bold">En cours de préparation</div>
        </div>
        <div class="sep flex-1 w-full h-px bg-linkColor"></div>
        <div class="2 relative">
          <div class="bg-linkColor p-[18px] rounded-full "></div>
          <div class=" absolute -bottom-5 w-52 -left-3 text-xs text-linkColor font-bold">En transit</div>
        </div>
        <div class="sep flex-1 h-px bg-linkColor"></div>
        <div class="bg-linkColor p-[18px] rounded-full relative">
          <div class=" absolute -bottom-5 w-52 left-0 text-xs text-linkColor font-bold">Livrée</div>
        </div>
      </div>
    </div>
    <div class="w-full p-6">
      <button class="flex w-full items-center justify-center py-2 border border-black bg-transparent font-bold rounded-full">Annuler commande</button>
    </div>
  </div>
</template>

<style scoped>

</style>