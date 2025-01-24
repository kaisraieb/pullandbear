<script setup>
import {useRouter} from 'vue-router';
import {onMounted} from "vue";

const router = useRouter();

const handleVisa = () => {
  window.localStorage.setItem('methodPay', 'visa');
  router.push('/order-checkout/visa');
}

const handlePay = () => {
  window.localStorage.setItem('methodPay', 'pay');
  router.push('/order-checkout/summary');
}

onMounted(() => {
  window.localStorage.setItem("methodPay", "");
})

</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-xl mb-5">
      Moyen de paiement
    </h1>
    <div class="methods flex items-center gap-4 w-full">
      <div
          class="visa flex-1 p-6 flex items-center cursor-pointer justify-between border border-gray-300 shadow-lg rounded-lg"
          @click="handleVisa">
        <h1 class="text-xl">Visa</h1>
        <img src="/VISA.svg" alt="visa">
      </div>
      <div
          class="delivery cursor-pointer flex-1 p-6 flex items-center justify-between border border-gray-300 shadow-lg rounded-lg"
          @click="handlePay">
        <h1>PayOnDelivery</h1>
        <img src="/COD.svg" alt="Cod">
      </div>
    </div>
  </div>
</template>

<style scoped></style>