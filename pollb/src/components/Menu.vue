<template>
  <div class="menu-panel absolute left-0 top-0 w-[60vw] h-screen bg-white flex items-center z-30">
    <div class="left-menu-panel p-6 w-1/2 h-full flex flex-col justify-between border-r border-gray">
      <div class="top-menu-panel flex items-center gap-5 mb-6">
        <div class="menu-btn border border-black rounded-full flex items-center py-1 px-3">
          <Icon class="pi-bars" />
          <span class="text-black font-semibold ml-1.5">Menu</span>
        </div>
        <div class="top-menu-links flex items-center gap-2">
          <router-link to="/femme" class="text-xl transition-all "
            :class="{ 'border-b-2 border-black': route.fullPath.includes('/femme') }">Femme</router-link>
          <router-link to="/homme" class="text-xl transition-all "
            :class="{ 'border-b-2 border-black': route.fullPath.includes('/homme') }">Homme</router-link>
        </div>
      </div>
      <div class="cat-slider">
        <h2 class="text-base font-semibold mb-2">Des suggestions pour toi</h2>
        <div class="cat-slides relative">
          <Transition name="menu">
            <Button class="absolute z-30 top-[0.750rem] left-1" @click="scrollLeft" v-show="canScrollLeft">
              <Icon class="pi-angle-left text-black" />
            </Button>
          </Transition>
          <ul ref="scrollContainer" class="flex gap-3 w-full overflow-x-hidden py-3">
            <li class="px-5 py-3 bg- inline-flex bg-customGray rounded-xl shadow-md"
              v-for="(link, n) in catLinks.slice(0, 6)" :key="n">
              <router-link class="inline-block whitespace-nowrap truncate text-xs w-full h-full"
                :to="link.path">{{ link.name }}</router-link>
            </li>
          </ul>
          <Transition name="menu">
            <Button class="absolute z-30 top-[0.750rem] right-1" @click="scrollRight" v-show="canScrollRight">
              <Icon class="pi-angle-right text-black" />
            </Button>
          </Transition>
        </div>
      </div>
      <div class="all-cats flex mt-4 gap-5">
        <div class="left-all-cats flex flex-col flex-1 w-1/2 h-full">
          <ul class="flex flex-col gap-6">
            <li class="flex items-center gap-1" v-for="(link, n) in catLinks.slice(0, 13)" :key="n">
              <Transition name="menu">
                <img v-show="link.imageSrc" :src="link.imageSrc" alt="" class="w-6">
              </Transition>
              <router-link :to="link.path" class="text-black text-xs">{{ link.name }}</router-link>
              <Transition name="menu">
                <span v-show="link.status"
                  class="flex items-center justify-center bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs ml-1">{{ link.status }}</span>
              </Transition>
            </li>
          </ul>
        </div>
        <div class="right-all-cats flex-1 h-full">
          <ul class="flex flex-col gap-4">
            <li class="flex items-center gap-1" v-for="(link, n) in catLinks.slice(14, 19)" :key="n">
              <Transition name="menu">
                <img v-show="link.imageSrc" :src="link.imageSrc" alt="" class="w-6">
              </Transition>
              <router-link :to="link.path" class="text-black text-xs">{{ link.name }}</router-link>
              <Transition name="menu">
                <span v-show="link.status"
                  class="flex items-center justify-center bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs ml-1">{{ link.status }}</span>
              </Transition>
            </li>
          </ul>
        </div>
      </div>
      <div class="other-pages flex flex-col gap-1 mt-5">
        <div class="top-other-pages-row">
          <ul class="flex flex-row gap-4">
            <li>
              <router-link to="/" class="text-sm text-linkColor">Join life</router-link>
            </li>
            <li>
              <router-link to="/" class="text-sm text-linkColor">Foire aux questions</router-link>
            </li>
          </ul>
        </div>
        <div class="bottom-other-pages-row">
          <ul class="flex flex-row gap-4">
            <li>
              <router-link to="/" class="text-sm text-linkColor">Comment effectuer un retour</router-link>
            </li>
            <li>
              <router-link to="/" class="text-sm text-linkColor">Magasins</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-menu-panel flex-1 h-full p-6">
      <h1 class="text-lg font-semibold text-center mb-2">Recommandés pour
        toi
      </h1>
      <div class="recommended w-full grid grid-cols-4 p-16" :class="{ 'p-6 -mt-6': route.fullPath !== '/' }">

        <div v-if="route.fullPath.includes('/homme')" class="box-recom" v-for="rec in recommendedImages"
          :key="rec.name">
          <router-link :to="rec.path">
            <img class="max-w-full" :src="rec.url" />
          </router-link>
        </div>
        <div v-else class="box-recom" v-for="n in 24" :key="n">
          <router-link :to="recommendedImagesFemme[ 0 ].path">
            <img class="max-w-full" :src="recommendedImagesFemme[ 0 ].url" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

// import components
import Icon from './Icon.vue';
import Button from './Button.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";

// refs
const scrollContainer = ref(null);

// data

const route = useRoute();

let cat = ref("");

if (route.fullPath === "/homme") {
  cat.value = "homme"
} else if (route.fullPath === "/femme") {
  cat.value = "femme"
} else {
  cat.value = "homme"
}

const catLinks = [
  { path: `/products/${cat.value}/jeans`, name: "Nouveautés" },
  { path: `/products/${cat.value}/jeans`, name: "Sweat" },
  { path: `/products/${cat.value}/jeans`, name: "Pantalons" },
  { path: `/products/${cat.value}/jeans`, name: "Jeans" },
  { path: `/products/${cat.value}/jeans`, name: "Blousons et manteaux" },
  { path: `/products/${cat.value}/jeans`, name: "Baskets" },
  { path: `/products/${cat.value}/jeans`, name: "T Shirts" },
  { path: `/products/${cat.value}/jeans`, name: "Pulls" },
  { path: `/products/${cat.value}/jeans`, name: "Chaussures" },
  { path: `/products/${cat.value}/jeans`, name: "Chemises" },
  { path: `/products/${cat.value}/jeans`, name: "Survêtement" },
  { path: `/products/${cat.value}/jeans`, name: "Shorts" },
  { path: `/products/${cat.value}/jeans`, name: "Accessoires" },
  { path: `/products/${cat.value}/jeans`, name: "Sacs | Sacs à dos" },
  { path: `/products/${cat.value}/jeans`, name: "Collaborations", status: "TREND" },
  { path: `/products/${cat.value}/jeans`, name: "&(AND)", imageSrc: "/and.jpg" },
  { path: `/products/${cat.value}/jeans`, name: "STWD", imageSrc: "/stwd.jpg" },
  { path: `/products/${cat.value}/jeans`, name: "Often", imageSrc: "/often.jpg" },
  { path: `/products/${cat.value}/jeans`, name: "Special Collection" },
];

const recommendedImages = [
  { path: "/", url: "/recommended Imgs/recom01.jpg" },
  { path: "/", url: "/recommended Imgs/recom02.jpg" },
  { path: "/", url: "/recommended Imgs/recom03.jpg" },
  { path: "/", url: "/recommended Imgs/recom04.jpg" },
  { path: "/", url: "/recommended Imgs/recom05.jpg" },
  { path: "/", url: "/recommended Imgs/recom06.jpg" },
  { path: "/", url: "/recommended Imgs/recom07.jpg" },
  { path: "/", url: "/recommended Imgs/recom08.jpg" },
  { path: "/", url: "/recommended Imgs/recom09.jpg" },
  { path: "/", url: "/recommended Imgs/recom10.jpg" },
  { path: "/", url: "/recommended Imgs/recom11.jpg" },
  { path: "/", url: "/recommended Imgs/recom12.jpg" },
  { path: "/", url: "/recommended Imgs/recom13.jpg" },
  { path: "/", url: "/recommended Imgs/recom14.jpg" },
  { path: "/", url: "/recommended Imgs/recom15.jpg" },
  { path: "/", url: "/recommended Imgs/recom16.jpg" },
  { path: "/", url: "/recommended Imgs/recom17.jpg" },
  { path: "/", url: "/recommended Imgs/recom18.jpg" },
  { path: "/", url: "/recommended Imgs/recom19.jpg" },
  { path: "/", url: "/recommended Imgs/recom20.jpg" },
  { path: "/", url: "/recommended Imgs/recom21.jpg" },
  { path: "/", url: "/recommended Imgs/recom22.jpg" },
  { path: "/", url: "/recommended Imgs/recom23.jpg" },
  { path: "/", url: "/recommended Imgs/recom24.jpg" },
]

const recommendedImagesFemme = [
  { path: "/", url: "/femme-recoms/recom1.jpg" },
]

const isLeftScrollable = ref(false);
const isRightScrollable = ref(false);

const canScrollLeft = computed(() => isLeftScrollable.value);
const canScrollRight = computed(() => isRightScrollable.value);

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -1200, behavior: "smooth" });
  updateScrollState();
};

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 1200, behavior: "smooth" });
  updateScrollState();
};

const updateScrollState = () => {
  if (scrollContainer.value) {
    isLeftScrollable.value = scrollContainer.value.scrollLeft > 0;
    isRightScrollable.value =
      scrollContainer.value.scrollWidth >
      scrollContainer.value.clientWidth + scrollContainer.value.scrollLeft;
  }
};

onMounted(() => {
  const container = scrollContainer.value;
  if (container) {
    container.addEventListener("scroll", updateScrollState);
    updateScrollState();
  }
});
</script>

<style scoped>
.pi {
  color: #000 !important;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>