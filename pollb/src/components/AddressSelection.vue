<script setup>
import Icon from "@/components/Icon.vue";
import {useRouter} from "vue-router";
import {useAddress} from "@/store/Address.js";
import {onMounted} from "vue";

const router = useRouter();
const data = useAddress();

const handleRedirect = (id) => {
  if (id) {
    router.push({name: "AddressForm", params: {id: id}});
  }
};

const handlepay = (id) => {
  window.localStorage.setItem("idAdr", id);
  router.push('/order-checkout/paiement');
}

onMounted(() => {
  window.localStorage.setItem("idAdr", "");
})

</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-xl mb-5">Adresse de livraison</h1>
    <div v-for="address in data.addresses" :key="address.id">
      <div class="address-selection flex items-center justify-between rounded-2xl shadow-lg">
        <div class="infos py-6 pl-6 flex-1" @click="handlepay(address.id)">
          <p class="font-bold">{{ address.firstName + " " + address.lastName }}</p>
          <p>{{ address.street }}, {{ address.postalCode }}, {{ address.governorate }}, {{ address.city }}</p>
        </div>
        <div class="icon px-6" @click="handleRedirect(address.id)">
          <Icon class="pi-pencil !text-black cursor-pointer"></Icon>
        </div>
        <div v-show="data.allAdrs.length !== 1" class="icon px-6" @click="data.removeAddress(Number(address.id))">
          <Icon class="pi-trash !text-black cursor-pointer"></Icon>
        </div>
      </div>
    </div>
    <button @click="router.push('/order-checkout/address-form')"
            class="bg-white border-2 flex-1 border-black text-black py-2 text-xl rounded-full w-full mt-10">
      Ajouter
    </button>
  </div>
</template>

<style scoped></style>