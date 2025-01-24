<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar></Navbar>
    <Transition name="home">
      <div class="home absolute top-0 left-0 flex flex-col lg:flex-row items-center w-full h-screen">
        <div
          class="femme flex-1 w-full h-full bg-woman-img bg-top lg:bg-center bg-cover flex items-center justify-center">
          <router-link to="/femme"
            class="text-white text-4xl font-medium w-full h-full flex items-center justify-center">Femme
          </router-link>
        </div>
        <div
          class="homme flex-1 w-full h-full bg-man-img bg-top lg:bg-center bg-cover flex items-center justify-center">
          <router-link to="/homme"
            class="text-white text-4xl font-medium w-full h-full flex items-center justify-center">Homme
          </router-link>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.home-enter-active,
.home-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.home-enter-from,
.home-leave-to {
  opacity: 0;
}
</style>
