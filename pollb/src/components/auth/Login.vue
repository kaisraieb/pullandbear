<template>
  <div class="login flex flex-col" :class="{'max-w-[400px]': router.fullPath === '/order-checkout/donnees'}">
    <h1 class="text-2xl font-bold mb-2">
      Saisis ton numéro de téléphone ou adresse e-mail
    </h1>
    <div class="relative mt-3 bg-customGray py-3 px-6 rounded-full transition-all border-2" ref="divInput">
      <input type="text" id="telmail" v-model="inputValue"
        class="peer border-none outline-none bg-transparent transition-all text-sm w-full pt-4" @input="validateInput"
        @blur="validateInput" />
      <label for="telmail" class="absolute left-6 transition-all text-sm text-linkColor transform 
        -translate-y-1/2 top-1/2
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
        peer-focus:top-4 peer-focus:text-xs peer-focus:text-black" :class="{ 'top-4 text-xs text-black': inputValue }"
        ref="labelMailTel">
        Téléphone / E-mail
      </label>
    </div>
    <Transition name="error">
      <p class="errors text-red-600 text-xs pl-3 mt-2 mb-4 flex items-center gap-2" v-show="errors">
        <Icon class="pi-exclamation-circle text-xs text-red-600" />
        {{ errors }}
      </p>
    </Transition>
    <div class="flex items-center pt-3 pl-3 gap-3">
      <input type="checkbox" class="" id="rester">
      <label for="rester">Rester Connecté</label>
    </div>
    <SubmitBtn type="submit" class="text-white bg-black mt-4 hover:opacity-90" @click="handleTelMail">
      Suivant
    </SubmitBtn>
    <div class="otherLinks mt-5">
      <ul class="flex flex-col items-center gap-2">
        <li>
          <button @click="checkCodeEmit" class="underline">Se connecter avec un code</button>
        </li>
        <li>
          <button class="underline" @click="checkMdpEmit">Vous avez oublié votre mot de passe ?</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Icon from "../Icon.vue";
import SubmitBtn from "../SubmitBtn.vue";
import {useRoute, useRouter} from "vue-router";

const inputValue = ref("");
const errors = ref("");
const s = ref(null);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const telRegex = /^(95|96|97|98|99|50|51|52|53|54|55|20|21|22|23|24|25)\d{6}$/;
const divInput = ref("divInput");

let user_infos = reactive({
  email: "",
  phone: "",
})

const router = useRoute();
const userouter = useRouter();


const emit = defineEmits(['switch-comp']);

const validateInput = () => {
  errors.value = "";
  s.value = false;
  divInput.value.classList.remove("border-green-600");
  inputValue.value = inputValue.value.trim();
  if (!inputValue.value) {
    errors.value = "Désolé ! Ces données sont requises.";
    divInput.value.classList.remove("border-green-600");
  } else if (!emailRegex.test(inputValue.value) && !telRegex.test(inputValue.value)) {
    errors.value = "Le format des données saisies n’est pas correct";
    divInput.value.classList.remove("border-green-600");
  } else {
    errors.value = '';
    divInput.value.classList.add("border-green-600");
    s.value = true;
  }
};

const handleTelMail = () => {
  validateInput();
  if (s.value === true && emailRegex.test(inputValue.value)) {
    user_infos.email = inputValue.value;
    window.localStorage.setItem("user_infos", JSON.stringify(user_infos));
    emit("switch-comp", "GetCode");
    if (router.fullPath === "/order-checkout/donnees") {
      userouter.push("/order-checkout/donnees-get-code");
    }
  }
  if (s.value === true && telRegex.test(inputValue.value)) {
    user_infos.phone = inputValue.value;
    window.localStorage.setItem("user_infos", JSON.stringify(user_infos));
  }
}

const checkCodeEmit = () => {
  validateInput();
  if (s.value === true && emailRegex.test(inputValue.value)) {
    user_infos.email = inputValue.value;
    window.localStorage.setItem("user_infos", JSON.stringify(user_infos));
    emit("switch-comp", "GetCode");
  }
}

const checkMdpEmit = () => {
  validateInput();
  if (s.value === true && emailRegex.test(inputValue.value)) {
    user_infos.email = inputValue.value;
    window.localStorage.setItem("user_infos", JSON.stringify(user_infos));
    emit("switch-comp", "ResetMdp");
  }
}

onMounted(() => {
  errors.value = "";
  console.log(router.fullPath)
});
</script>

<style scoped>
.error-enter-active,
.error-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
}

.pi-exclamation-circle {
  color: red !important;
}
</style>