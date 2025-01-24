<script setup>

</script>

<template>
  <div class="footer flex items-center justify-center flex-col w-full border-t border-gray-200">
    <div class="first-row w-[880px] m-auto flex gap-10 flex-row py-10">
      <div class="col flex flex-col flex-1">
        <h3 class="font-semibold mb-6">Aide</h3>
        <ul class="flex flex-col gap-4 text-xs text-gray-600">
          <li>
            <router-link to="/">Questions fréquentes</router-link>
          </li>
          <li>
            <router-link to="/">Effectuer un retour</router-link>
          </li>
        </ul>
      </div>
      <div class="col flex-1">
        <h3 class="font-semibold mb-6">Entreprise</h3>
        <ul class="flex flex-col gap-4 text-xs text-gray-600">
          <li>
            <router-link to="/">Qui sommes-nous ?</router-link>
          </li>
          <li>
            <router-link to="/">Rejoignez notre équipe</router-link>
          </li>
        </ul>
      </div>
      <div class="col flex-1">
        <h3 class="font-semibold mb-6">Notre appli</h3>
        <div class="apps flex gap-4 mb-6">
          <img src="/ios.png" class="w-32 h-10">
          <img src="/android.png" class="w-32 h-10">
        </div>
        <div class="col2">
          <h3 class="font-semibold mb-6">Moyens de paiement</h3>
          <div class="moys flex gap-4 mb-6">
            <img src="/VISA.svg">
            <img src="/COD.svg">
          </div>
        </div>
        <div class="col3">
          <h3 class="font-semibold mb-5">Suivez-nous !</h3>
          <ul class="flex gap-4">
            <li>
              <a href="#">
                <img src="/social-icons/tiktok.png" alt="">
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/social-icons/instagram.png" alt="">
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/social-icons/facebook.png" alt="">
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/social-icons/twitterv2.png" alt="">
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/social-icons/youtube.png" alt="">
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/social-icons/pinterest.png" alt="">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="second-row border-t border-gray-200 w-full">
      <ul class="flex items-center justify-center w-[80vw] m-auto p-4 text-xs ">
        <li class="border-r border-gray-400 px-3">
          <router-link to="/">Préférences de cookies</router-link>
        </li>
        <li class="border-r border-gray-400 px-3">
          <router-link to="/">Politique de confidentialité</router-link>
        </li>
        <li class="border-r border-gray-400 px-3">
          <router-link to="/">Conditions d’achat</router-link>
        </li>
        <li class="border-r border-gray-400 px-3">
          <router-link to="/">Politique en matière de cookies</router-link>
        </li>
        <li class="border-r border-gray-400 px-3">
          <router-link to="/">T&C Pull&Bear Community</router-link>
        </li>
        <li class="border-r border-gray-400 px-3">
          <router-link to="/" class="flex items-center gap-2">
            <img src="/worldwide.svg" class="w-4">
            Tunisia / الجمهورية التونسية
          </router-link>
        </li>
        <li class="px-3">
          <router-link to="/">Français</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>