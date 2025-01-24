<template>
  <div class="auth absolute z-10 flex items-center flex-col right-3 top-3 rounded-xl bg-white w-[375px] h-auto">
    <div class="top-auth-opts px-6 py-5 w-full flex items-center justify-between border-b-2 border-linkColor">
      <Icon class="pi-arrow-left cursor-pointer transition-opacity duration-300"
            :class="{ invisible: componentsHistory.length <= 1, visible: componentsHistory.length > 1 }"
            @click="goBack"/>
      <p class="text-black text-sm font-bold">Connexion / Inscription</p>
      <Icon class="pi-times cursor-pointer" @click="toggleAuth"/>
    </div>
    <div class="auth-content flex-1 w-full py-5 px-4">
      <Component :is="getCurrentComponent" @switch-comp="switchComp" ></Component>
    </div>
    <div class="p-6">
      <p class="text-xs text-center">
        Le code de vérification sera envoyé au numéro de téléphone / à l’adresse e-mail indiqué(e).
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import Icon from '../Icon.vue';
import Login from './Login.vue';
import GetCode from './GetCode.vue';
import AddMail from './AddMail.vue';
import ResetMdp from './ResetMdp.vue';

const authOpenProps = defineProps({
  authOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:authOpen']);

const currentComp = ref('Login');
const componentsHistory = ref(['Login']);

const getCurrentComponent = computed(() => {
  switch (currentComp.value) {
    case 'Login':
      return Login
    case 'GetCode':
      return GetCode
    case 'AddMail':
      return AddMail
    case 'ResetMdp':
      return ResetMdp
    default:
      return Login
  }
})

const switchComp = (componentName) => {
  if (componentName && typeof componentName === 'string') {
    componentsHistory.value.push(componentName);
    currentComp.value = componentName;
  }
};

const goBack = () => {
  if (componentsHistory.value.length > 1) {
    componentsHistory.value.pop();
    currentComp.value = componentsHistory.value[componentsHistory.value.length - 1];
  }
};

const toggleAuth = () => {
  emit('update:authOpen', false);
  currentComp.value = 'Login';
  componentsHistory.value = ['Login'];
};

onMounted(() => {
  console.log(authOpenProps.authOpen);
})

</script>

<style scoped>
.invisible {
  opacity: 0;
  pointer-events: none;
}

.visible {
  opacity: 1;
  pointer-events: auto;
}

.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}

.pi {
  color: #000 !important;
}
</style>
