<script setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import Icon from './Icon.vue';

const router = useRouter();
const route = useRoute();

const form = ref({
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  additionalInfo: '',
  postalCode: '',
  governorate: '',
  city: '',
  id: 0
});

const errors = ref({
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  postalCode: '',
  governorate: '',
  city: '',
});

const validateForm = () => {
  let isValid = true;

  errors.value = {
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    postalCode: '',
    governorate: '',
    city: '',
  };

  if (!form.value.firstName) {
    errors.value.firstName = 'First name is required.';
    isValid = false;
  }
  if (!form.value.lastName) {
    errors.value.lastName = 'Last name is required.';
    isValid = false;
  }
  if (!form.value.phone) {
    errors.value.phone = 'Phone number is required.';
    isValid = false;
  }
  if (!form.value.street) {
    errors.value.street = 'Street is required.';
    isValid = false;
  }
  if (!form.value.postalCode) {
    errors.value.postalCode = 'Postal code is required.';
    isValid = false;
  }
  if (!form.value.governorate) {
    errors.value.governorate = 'Governorate is required.';
    isValid = false;
  }
  if (!form.value.city) {
    errors.value.city = 'City is required.';
    isValid = false;
  }

  return isValid;
};

import {useAddress} from '@/store/Address';

const data = useAddress();
const ad = [];

const handleSubmit = () => {
  if (validateForm()) {
    if (form.value.id !== 0) {
      data.updateAddress(form.value)
      window.localStorage.setItem('addresses', ad.push(form.value));
    } else {
      data.addAddress(form.value);
      ad.push(form.value);
      window.localStorage.setItem('addresses', JSON.stringify(ad));
    }
    router.push('/order-checkout/address-selection');
  }
};


onMounted(() => {
  const id = +route.params.id
  if (id) {
    const ads = window.localStorage.getItem('addresses');
    const ad2md = (ads) => {
      return ads.find((ad) => ad.id === id)
    };
    const address2Modify = data.getAdrById(id);
    if (address2Modify) {
      form.value = {...address2Modify};
      console.log(address2Modify)
    } else {
      form.value = {...ad2md};
    }
  }
})

</script>

<template>
  <div class="don1">
    <h1 class="text-xl font-bold mt-8 mb-8">Données personnelles</h1>
    <form class="mb-8">
      <div class="inp-grp flex items-center w-full gap-2 mb-5">
        <div class="flex flex-col flex-1">
          <input v-model="form.firstName" type="text" placeholder="Prenom *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.firstName" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.firstName }}
          </div>
        </div>
        <div class="flex flex-col flex-1">
          <input v-model="form.lastName" type="text" placeholder="Nom *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.lastName" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.lastName }}
          </div>
        </div>
      </div>
      <div class="inp-grp flex items-center gap-2 w-1/2">
        <input type="text" readonly value="+216"
               class="border-none outline-none w-[100px] bg-[#F0F0F0] transition-all text-sm py-4 px-8 rounded-3xl">
        <div class="flex flex-col">
          <input v-model="form.phone" type="text" placeholder="Telephone Portable *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.phone" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.phone }}
          </div>
        </div>
      </div>
    </form>

    <h1 class="text-xl font-bold mt-8 mb-8">Données de livraison</h1>
    <form class="mb-8">
      <div class="inp-grp flex items-center gap-2 mb-5">
        <div class="flex flex-col">
          <input v-model="form.street" type="text" placeholder="Voix *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.street" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.street }}
          </div>
        </div>
        <input v-model="form.additionalInfo" type="text" placeholder="Informations complémentaires (Facultatif) *"
               class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
      </div>
      <div class="inp-grp flex items-center gap-2">
        <div class="flex flex-col flex-1">
          <input v-model="form.postalCode" type="text" placeholder="Code Postal *"
                 class="border-none outline-none w-full bg-[#F0F0F0] transition-all text-sm py-4 px-8 rounded-3xl">
          <div v-if="errors.postalCode" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.postalCode }}
          </div>
        </div>
        <div class="flex flex-col flex-1">
          <input v-model="form.governorate" type="text" placeholder="Governorat *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.governorate" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.governorate }}
          </div>
        </div>
        <div class="flex flex-col flex-1">
          <input v-model="form.city" type="text" placeholder="Ville *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.city" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.city }}
          </div>
        </div>
        <input type="text" readonly value="Tunisia / الجمهورية التونسية *"
               class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl flex-1">
      </div>
    </form>
    <div class="notice text-xs text-linkColor max-w-[80%]">
      En poursuivant votre navigation, vous confirmez avoir lu et compris les informations sur l’utilisation de vos
      données à caractère personnel expliquées dans la Politique de confidentialité.
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

<style scoped></style>