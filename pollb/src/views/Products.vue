<template>
    <div class="bg-[#F0F0F0]">
        <Navbar></Navbar>
        <div
            class="absolute filter-search w-full flex items-center justify-center top-24 left-1/2 -translate-x-1/2 z-10">
            <ul v-if="router.fullPath.includes('/homme')"
                class="flex flex-1 max-w-max gap-3 w-full overflow-x-hidden py-3">
                <li class="bg- inline-flex rounded-xl bg-customGray shadow-md" v-for="(link, n) in filtersHomme"
                    :key="n">
                    <router-link
                        class="px-5 py-3 rounded-xl transition-all inline-block whitespace-nowrap truncate text-xs w-full h-full"
                        :to="link.path" exact-active-class="bg-black text-white" active-class="bg-black text-white">{{
                            link.name }}</router-link>
                </li>
            </ul>
            <ul v-else class="flex flex-1 max-w-max gap-3 w-full overflow-x-hidden py-3">
                <li class="bg- inline-flex rounded-xl bg-customGray shadow-md" v-for="(link, n) in filtersFemme"
                    :key="n">
                    <router-link
                        class="px-5 py-3 rounded-xl transition-all inline-block whitespace-nowrap truncate text-xs w-full h-full"
                        :to="link.path" exact-active-class="bg-black text-white" active-class="bg-black text-white">{{
                            link.name }}</router-link>
                </li>
            </ul>
            <div class="options-filter">

            </div>
        </div>
        <transition name="fade" mode="out-in">
            <router-view :products="filtredProducts" class="w-full absolute top-48 px-16 grid grid-cols-4 gap-3" />
        </transition>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { useAddProductsStore } from '@/store/addProducts';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();
const data = useAddProductsStore();

const gen = computed(() => router.fullPath.includes("/homme") ? "homme" : "femme");

const prodCom = computed(() => router.fullPath.split("/")[3]);
const prod = computed(() => router.fullPath.split("/")[4]);

const filtersHomme = [
    { path: `/products/${gen.value}/${prodCom.value}/`, name: "Tout Afficher" },
    { path: `/products/${gen.value}/${prodCom.value}/baggy`, name: "Baggy" },
    { path: `/products/${gen.value}/${prodCom.value}/superbaggy`, name: "Super Baggy" },
    { path: `/products/${gen.value}/${prodCom.value}/skater`, name: "Skater" },
    { path: `/products/${gen.value}/${prodCom.value}/standard`, name: "Standard" },
    { path: `/products/${gen.value}/${prodCom.value}/straight`, name: "Straight" },
    { path: `/products/${gen.value}/${prodCom.value}/slim`, name: "Slim" },
    { path: `/products/${gen.value}/${prodCom.value}/carotte`, name: "Carotte" },
    { path: `/products/${gen.value}/${prodCom.value}/guide-de-tailles`, name: "Guide des tailles" },
];

const filtersFemme = [
    { path: `/products/${gen.value}/${prodCom.value}/`, name: "Tout Afficher" },
    { path: `/products/${gen.value}/${prodCom.value}/baggy`, name: "Baggy" },
    { path: `/products/${gen.value}/${prodCom.value}/super-baggy`, name: "Super Baggy" },
    { path: `/products/${gen.value}/${prodCom.value}/skater`, name: "Skater" },
    { path: `/products/${gen.value}/${prodCom.value}/standard`, name: "Standard" },
];

const filtredProducts = computed(() => {
    return data.filterProducts(gen.value, prod.value);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>