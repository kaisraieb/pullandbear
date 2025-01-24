<template>
  <div class="get-code">
    <h1>Code de vérification</h1>
    <p>
      Saisissez le code que vous avez reçu par e-mail à
      <span class="font-bold">{{ email }}</span>
    </p>
    <div class="code-boxes flex items-center gap-2 my-5 w-full">
      <input
          v-for="(n, index) in 3"
          :key="'group1-' + index"
          type="text"
          v-model="group1Values[index]"
          :ref="el => { if (el) group1Inputs[index] = el }"
          maxlength="1"
          class="w-12 border-2 border-b-black border-transparent h-12 text-center transition-all outline-none focus:border-black"
          @input="handleCurNextInp(index, $event, group1Inputs)"
          @keydown="handleKeyDown(index, $event, group1Inputs)"
      />
      <span class="text-sm font-bold">-</span>
      <input
          v-for="(n, index) in 3"
          :key="'group2-' + index"
          type="text"
          v-model="group2Values[index]"
          :ref="el => { if (el) group2Inputs[index] = el }"
          maxlength="1"
          class="w-12 border-2 border-b-black border-transparent h-12 text-center transition-all outline-none focus:border-black"
          @input="handleCurNextInp(index, $event, group2Inputs)"
          @keydown="handleKeyDown(index, $event, group2Inputs)"
      />
    </div>
    <SubmitBtn
        type="submit"
        @click="handleClickSuiv"
        class="w-full text-white bg-black mt-8 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!isCodeComplete"
    >
      Suivant
    </SubmitBtn>
    <SubmitBtn
        type="submit"
        class="w-full text-white bg-black mt-3 hover:opacity-90"
        @click="$emit('switch-comp', 'ResetMdp')"
    >
      Je n'ai pas reçu le code
    </SubmitBtn>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import SubmitBtn from '@/components/SubmitBtn.vue';
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  authOpen: {
    type: Boolean,
  }
});

console.log(props.authOpen);

const emit = defineEmits(['switch-comp', 'update:authOpen']);
const email = ref('');

const group1Inputs = ref([]);
const group2Inputs = ref([]);

const group1Values = ref(Array(3).fill(''));
const group2Values = ref(Array(3).fill(''));

// Get email from localStorage
const getMail = () => {
  const userInfos = JSON.parse(window.localStorage.getItem('user_infos') || '{}');
  email.value = userInfos.email || '';
};

const handleCurNextInp = (index, event, inputGroup) => {
  const inputValue = event.target.value;
  if (inputValue.length === 1 && index < inputGroup.length - 1) {
    inputGroup[index + 1]?.focus();
  }
};

const handleKeyDown = (index, event, inputGroup) => {
  const inputValue = event.target.value;
  if (event.key === 'Backspace' && inputValue.length === 0 && index > 0) {
    inputGroup[index - 1]?.focus();
  }
};

const isCodeComplete = computed(() => {
  const group1Filled = group1Values.value.every(value => value.length === 1);
  const group2Filled = group2Values.value.every(value => value.length === 1);
  return group1Filled && group2Filled;
});

const handleClickSuiv = () => {
  if (isCodeComplete.value) {
    if (route.fullPath === '/order-checkout/donnees-get-code') {
      window.localStorage.setItem('isLogin', true)
      router.push("/order-checkout/shipping-types");
    }

    const userInfos = JSON.parse(window.localStorage.getItem('user_infos') || '{}');
    if (!userInfos.email) {
      userInfos.email = email.value;
      window.localStorage.setItem('user_infos', JSON.stringify(userInfos));
    }

    emit('update:authOpen', false);
  }
};

onMounted(() => {
  getMail();
  group1Inputs.value[0]?.focus();
});
</script>

<style scoped>
.get-code {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.code-boxes {
  display: flex;
  justify-content: center;
}

input {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #000;
}
</style>