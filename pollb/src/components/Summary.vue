<template>
  <div>
    <h1 class="font-bold text-xl mb-5">Résumé de la commande</h1>
    <div class="p-6 flex flex-col border border-gray-300 shadow-lg rounded-lg">
      <div class="liv">
        <div class="1">
          <div class="flex items-center gap-8 border-b border-gray-300 mb-5 pb-5">
            <Icon class="pi-shopping-bag !text-black"></Icon>
            <div class="flex gap-4 flex-col flex-1">
              <h1 class="text-base -mb-2">LIVRAISON À DOMICILE</h1>
              <div v-if="d" class="infos">
                <p class="text-sm text-linkColor">
                  {{ d.firstName }} {{ d.lastName }}, {{ d.postalCode }} {{ d.street }} {{ d.governorate }} {{ d.city }}
                </p>
                <p class="text-green-500 text-sm">Recevez-la entre le 29/01 et le 06/02</p>
                <p class="text-green-500 text-sm">Gratuite</p>
              </div>
            </div>
            <div class="edit">
              <Icon class="pi-pencil cursor-pointer !text-black"
                    @click="router.push('/order-checkout/shipping-types')"></Icon>
            </div>
          </div>
        </div>
        <div class="2">
          <div class="flex items-center gap-8 pb-5">
            <Icon class="pi-credit-card !text-black"></Icon>
            <div class="flex-1">
              <h1>Moyen de paiement</h1>
              <p v-if="paym === 'visa'" class="flex items-center gap-2">
                <img src="/VISA.svg" alt="">
                Visa
              </p>
              <p v-else class="flex items-center gap-2">
                <img src="/COD.svg" alt="">
                PayOnDelivery
              </p>
            </div>
            <div class="edit">
              <Icon class="pi-pencil cursor-pointer !text-black"
                    @click="router.push('/order-checkout/paiement')"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btns w-full flex items-center gap-2 mt-10">
      <button @click="router.back()"
              class="bg-transparent border-2 flex-1 border-black text-black py-2 text-xl rounded-full">Retour
      </button>
      <button @click="handleSubmit"
              class="bg-black border-2 flex-1 border-black text-white py-2 text-xl rounded-full">Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
import {useAddress} from "@/store/Address.js";
import Icon from "@/components/Icon.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useAddProductsStore} from "@/store/addProducts.js";

const router = useRouter();

const data = useAddress();
const data1 = useAddProductsStore();
const id = ref(null);
const d = ref(null);
const paym = ref(null);

onMounted(() => {
  id.value = Number(localStorage.getItem("idAdr"));
  if (id.value) {
    d.value = data.getAdrById(id.value);
  }
  paym.value = localStorage.getItem("methodPay");
});

const handleSubmit = () => {
  // Convert products to JSON string for localStorage
  const productsToStore = JSON.stringify(data1.addedProducts);
  localStorage.setItem("acheter", productsToStore);
  router.push("/order-checkout/commande-confirme");
}
</script>