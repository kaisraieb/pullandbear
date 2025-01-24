<template>
  <div class="navbar flex justify-between items-center backdrop-blur-md bg-transparent fixed w-full p-6 z-50">
    <div class="flex items-center gap-4">
      <div class="menu-btn border border-white rounded-full flex items-center py-1 px-3" @mouseenter="openMenuPanel"
           @mouseleave="closeMenuPanel" :class="{ '!border-black': route.fullPath !== '/', 'hidden': openSearchPanel }">
        <Icon class="pi-bars" :class="{ '!text-black': route.fullPath !== '/' }"/>
        <span class="text-white font-semibold ml-1.5" :class="{ '!text-black': route.fullPath !== '/' }">Menu</span>
      </div>
      <Transition name="menu">
        <div class="homme-femme-links flex items-center gap-4" v-show="route.fullPath !== '/'">
          <router-link to="/femme" class="text-lg font-semibold"
                       :class="{ 'border-b-2 border-black': route.fullPath.includes('/femme') }">Femme
          </router-link>
          <router-link to="/homme" class="text-lg font-semibold"
                       :class="{ 'border-b-2 border-black': route.fullPath.includes('/homme') }">Homme
          </router-link>
        </div>
      </Transition>
    </div>
    <div class="logo absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <router-link to="/">
        <img :src="route.fullPath === '/' ? '/logo_pull_white_new.svg' : '/logo_pull_black_new.svg'"
             class="max-w-full w-44"/>
      </router-link>
    </div>
    <div class="second-options flex items-center justify-between gap-5">
      <Transition name="menu">
        <Search v-show="openSearchPanel === true" :products="data.products"></Search>
      </Transition>
      <div @click="openSearch"
           class="search border-2 border-white px-3 py-1.5 rounded-full bg-white bg-opacity-15 flex items-center gap-3 cursor-pointer"
           :class="{ '!border-black': route.fullPath !== '/', 'hidden': openSearchPanel }">
        <label for="searchInput" class="cursor-pointer">
          <Icon class="pi-search text-sm" :class="{ '!text-black': route.fullPath !== '/' }"/>
        </label>
        <input type="text" id="search" :class="{ 'placeholder:text-black': route.fullPath !== '/' }"
               class="bg-transparent text-white focus:outline-none cursor-pointer" placeholder="Search ...">
      </div>
      <div :class="{ 'hidden': !openSearchPanel }" class="search-btn cursor-pointer" @click="openSearchPanel = false">
        <Icon class="pi-times !text-black" :class="{ 'hidden': openSearchPanel }"></Icon>
      </div>
      <div class="auth-btn" @click="toggleAuth">
        <Icon class="pi-user cursor-pointer" :class="{ '!text-black': route.fullPath !== '/' }"/>
      </div>
      <Transition name="menu">
        <Auth v-show="authOpen && !login" :authOpen="authOpen" @update:authOpen="authOpen = $event"/>
      </Transition>
      <Transition name="menu">
        <Dash v-show="openhist === true" @close="closeDash"/>
      </Transition>
      <div class="cart-btn transition-all flex flex-col justify-center items-center gap-0.5 relative"
           :class="{ 'border border-green-500 py-2 px-1 rounded-full': data.getAddedProductsCount > 0 }">
        <Icon class="pi-shopping-bag cursor-pointer" @click="toggleCartPanel"
              :class="{ '!text-black': route.fullPath !== '/', '!text-green-500': data.getAddedProductsCount > 0 }"/>
        <span v-show="data.getAddedProductsCount > 0" class="text-green-500 font-semibold">{{
            data.getAddedProductsCount
          }}</span>
        <transition name="menu">
          <div v-show="data.getFavoriteProductsCount !== 0">
            <Icon class="pi-heart-fill !text-pink-500 absolute text-xs -top-2 -right-2"/>
          </div>
        </transition>
      </div>
    </div>
    <Transition name="menu">
      <Menu v-if="menuOpen" @mouseenter="openMenuPanel" @mouseleave="closeMenuPanel"></Menu>
    </Transition>
    <Transition name="menu">
      <div v-if="menuOpen || (authOpen && !login) || cartOpen"
           class="overlay z10 w-full fixed right-0 top-0 h-screen bg-black bg-opacity-35">
      </div>
    </Transition>
    <Transition name="menu">
      <Cart v-if="cartOpen" :cartOpen="cartOpen" @update:cartOpen="cartOpen = $event"></Cart>
    </Transition>
  </div>
</template>

<script setup>
// Import components
import {ref, provide} from "vue";
import Icon from "./Icon.vue";
import Menu from "./Menu.vue";
import Auth from "./auth/Auth.vue";
import {useRoute} from "vue-router";
import {useAddProductsStore} from "@/store/addProducts";
import Cart from "./Cart.vue";
import Search from "./Search.vue";
import Dash from "@/components/Dash.vue";

// Manage states
let menuOpen = ref(false);
let authOpen = ref(false);
let cartOpen = ref(false);
let openSearchPanel = ref(false);
let login = JSON.parse(localStorage.getItem("isLogin"));
let openhist = ref(false);

const route = useRoute();
const data = useAddProductsStore();

// Functions to toggle visibility
const openMenuPanel = () => menuOpen.value = true;
const closeMenuPanel = () => menuOpen.value = false;
const toggleAuth = () => {
  if (login === true) {
    openhist.value = true;
  } else {
    authOpen.value = true
  }
};
const toggleCartPanel = () => cartOpen.value = !cartOpen.value;
const openSearch = () => openSearchPanel.value = true;

// Close the Dash component when the close button is clicked
const closeDash = () => {
  login = false;
  localStorage.setItem('isLogin', JSON.stringify(login));  // Update the login state in localStorage
};

</script>


<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>