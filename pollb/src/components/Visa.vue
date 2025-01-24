<template>
  <div>
    <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
      <div class="inp-grp flex w-full items-center gap-4">
        <div class="flex-1">
          <input v-model="form.num" type="text" placeholder="Numero de la carte *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.num" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.num }}
          </div>
        </div>
        <div class="flex-1">
          <input v-model="form.name" type="text" placeholder="Titulaire de la carte *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.name" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.name }}
          </div>
        </div>
      </div>
      <div class="input-grp flex items-center gap-4">
        <div class="flex-1">
          <input v-model="form.mois" type="text" placeholder="Mois *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.mois" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.mois }}
          </div>
        </div>
        <div class="flex-1">
          <input v-model="form.annee" type="text" placeholder="Année *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.annee" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.annee }}
          </div>
        </div>
        <div class="flex-1">
          <input v-model="form.cvv" type="text" placeholder="CVV *"
                 class="border-none outline-none bg-[#F0F0F0] transition-all text-sm w-full py-4 px-8 rounded-3xl">
          <div v-if="errors.cvv" class="error text-red-500 text-sm flex items-center gap-2 ml-2">
            <Icon class="pi-exclamation-circle !text-red-500 !text-xs"></Icon>
            {{ errors.cvv }}
          </div>
        </div>
      </div>
      <div class="btns w-full flex items-center gap-2 mt-10">
        <button @click="router.back()"
                class="bg-transparent border-2 flex-1 border-black text-black py-2 text-xl rounded-full">Retour
        </button>
        <button type="submit"
                class="bg-black border-2 flex-1 border-black text-white py-2 text-xl rounded-full">Suivant
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter(); // Initialize the router

const form = ref({
  num: '',
  name: '',
  mois: '',
  annee: '',
  cvv: '',
});

const errors = ref({
  num: '',
  name: '',
  mois: '',
  annee: '',
  cvv: '',
});

const validate = () => {
  let isValid = true;

  errors.value = {
    num: '',
    name: '',
    mois: '',
    annee: '',
    cvv: '',
  };

  if (!form.value.num) {
    errors.value.num = 'Le numero de la carte est obligatoire';
    isValid = false;
  }
  if (!form.value.name) {
    errors.value.name = 'Le titulaire de la carte est obligatoire';
    isValid = false;
  }
  if (!form.value.mois) {
    errors.value.mois = 'Le mois est obligatoire';
    isValid = false;
  }
  if (!form.value.annee) {
    errors.value.annee = "L'année est obligatoire";
    isValid = false;
  }
  if (!form.value.cvv) {
    errors.value.cvv = 'Le CVV est obligatoire';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (validate()) {
    router.push("/order-checkout/summary"); // Use the router to navigate
  }
};
</script>