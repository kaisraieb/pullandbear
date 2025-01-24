<template>
  <div class="product">
    <div class="product-img relative" @mouseenter="taillesAddDiv = true" @mouseleave="taillesAddDiv = false">
      <router-link to="/">
        <img :src="product.img1" alt="product.name" @mouseenter="$event.target.src = product.img2"
          @mouseleave="$event.target.src = product.img1" />
      </router-link>
      <transition name="fade">
        <div class="tailles-add absolute bottom-2 left-0 px-2 w-full flex items-center" v-show="taillesAddDiv">
          <div class="tailles w-1/2 bg-white text-xs relative flex items-center justify-between py-1 px-3"
            @mouseleave="taillesDiv = false">
            <transition name="fade">
              <div v-show="taillesDiv === true" class="absolute flex flex-col bottom-0 left-0 w-full bg-white text-xs">
                <span v-for="t in tailles" :key="t"
                  class="py-1 px-2 cursor-pointer hover:bg-slate-400 hover:bg-opacity-30" @click="handleTailleChoix(t)">
                  {{ t }}
                </span>
              </div>
            </transition>
            <span class="cursor-pointer flex-1" @mouseenter="taillesDiv = true">{{ taillesChoixSelected || "Tailles"
              }}</span>
            <Icon class="pi-angle-down !text-black text-xs"></Icon>
          </div>
          <button id="addbtn" class="bg-black text-white w-1/2 text-xs py-1"
            :class="{ 'bg-green-400': taillesChoixSelected }" @click="handleAjouterProd($event, product)">
            Ajouter
          </button>
        </div>
      </transition>
    </div>
    <div class="product-info flex items-center justify-between gap-2 p-4">
      <div class="infos flex flex-col flex-1 gap-1 text-center">
        <h3 class="text-sm">{{ product.name }}</h3>
        <p class="text-xs font-bold">{{ product.price }} TND</p>
      </div>
      <div class="addToFavorite cursor-pointer">
        <Icon class="!text-gray-400 text-sm p-2 rounded-full shadow-lg" @click="addProductToFavorite(product)"
          :class="[isProductInFavorites ? 'pi-heart-fill !text-pink-500' : 'pi-heart']"></Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Icon from '@/components/Icon.vue';
import { useAddProductsStore } from '@/store/addProducts';

const emit = defineEmits(['openAjouterPanierPanel']);

const data = useAddProductsStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const tailles = [46, 44, 42, 40, 38, 36, 34, 32];

let taillesDiv = ref(false);
let taillesChoixSelected = ref(null);
let taillesAddDiv = ref(false);

const isProductInFavorites = computed(() => {
  return data.favoriteProducts.some((p) => p.id === props.product.id);
});

const handleTailleChoix = (t) => {
  taillesDiv.value = false;
  taillesChoixSelected.value = t;
};

const addProductToFavorite = (product) => {
  if (isProductInFavorites.value) {
    data.removeFavoriteProduct(product);
  } else {
    data.addFavoriteProduct(product);
  }
};

const handleAjouterProd = (e, product) => {
  if (!taillesChoixSelected.value) {
    e.target.classList.add('bg-red-500');
  } else {
    e.target.classList.add('bg-black');
  }

  if (taillesChoixSelected.value) {
    data.addAddedProduct(product);
    emit('openAjouterPanierPanel', true);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>