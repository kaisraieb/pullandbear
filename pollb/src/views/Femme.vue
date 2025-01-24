<template>
  <div class="w-full min-h-screen">
    <div
      class="top-liv fixed top-0 bg-black text-white text-xs text-center w-full flex items-center justify-center h-10 ">
      Livraison gratuite en magasin | Retours gratuits
    </div>
    <Navbar class="top-10"></Navbar>
    <div
      class="nouveautes bg-femme-nouv-img w-full flex items-center justify-center h-screen bg-no-repeat bg-cover bg-center mt-32">
      <router-link to="/products/nouveautes" class="w-full h-full flex items-center justify-center">
        <span
          class="border-2 py-2 px-10 rounded-full text-white bg-black bg-opacity-25 transition-all hover:bg-opacity-70">Nouveautés</span>
      </router-link>
    </div>
    <div class="two-images bg-femme-two-img  bg-cover bg-center flex w-full items-center justify-center h-screen">
      <router-link to="/products/sweat" class="w-full h-full flex items-center justify-center">
        <span
          class="border-2 py-2 px-10 rounded-full text-white bg-black bg-opacity-25 transition-all hover:bg-opacity-70">Chaussures</span>
      </router-link>
    </div>
    <div class="mobile-app flex w-full items-center h-[570px] justify-center flex-row">
      <div class="app-video flex-1 h-full">
        <video autoplay loop class="max-w-full h-full">
          <source src="/Homme%20-%20pull&bear%20Tunisia%20-%20الجمهورية%20التونسية.mp4" />
        </video>
      </div>
      <div class="infos flex-1 h-full bg-fondo-one flex flex-col items-center justify-center">
        <div class="shuffle">
          <img src="/pbLogoShuffle.webp" class="max-w-full w-40 h-4">
        </div>
        <h1 class="py-3 text-5xl text-white font-bold">Trouve L'inspiration !</h1>
        <p class="w-[350px] text-[22px] !leading-[22px] text-white text-center">Profite de la nouvelle expérience
          d'achat video uniquement sur notre
          <br>APPLI
        </p>
        <router-link to="/products/jeans" class="mt-5 flex items-center justify-center">
          <span
            class="border-2 py-2 px-10 rounded-full text-white bg-white bg-opacity-25 transition-all hover:bg-opacity-100 hover:text-black">Télécharger
            l'appli</span>
        </router-link>
        <div class="qrcode">
          <img src="/descargaapppull2.png" class="max-w-full w-[91px] mt-5 h-[91px]">
        </div>
      </div>
    </div>
    <div class="contact-form w-[375px] m-auto max-h-screen flex flex-col items-center justify-center p-6">
      <h1 class="text-center w-full text-2xl font-semibold mb-5">LE PLUS PULL&BEAR DE LA <br> SAISON
        TU TE TROUVES DANS NOTRE <br> NEWSLETTER !</h1>
      <p class="max-w-80 text-center text-sm mb-5">Get ready pour découvrir toutes les tendances, les collaborations et
        les petits prix exclusifs !</p>
      <div class="input-grp w-full">
        <input type="text" class="bg-gray-200 w-full text-sm px-10 py-4 rounded-full outline-none"
          placeholder="Adresse e-mail" @focus="showInfosPanel">
      </div>
      <Transition name="menu">
        <div v-show="infosPanel" class="infos-input flex flex-col items-center justify-center p-6">
          <p class="text-sm">Ton inspiration nous intéresse. Que vas-tu choisir ?</p>
          <div class="choix flex flex-row gap-6 mt-5">
            <div class="inp flex items-center justify-center gap-3">
              <input type="radio" name="choix" id="choix1"> <label for="choix1">Girl topic 🙋</label>
            </div>
            <div class="inp items-center justify-center gap-3">
              <input type="radio" name="choix" id="choix2"> <label for="choix2"> Boy topic 🙋‍♂️ </label>
            </div>
          </div>
          <h1 class="font-bold text-xl w-96 text-center mt-5 mb-5">PS : Tu aimes les surprises ? Indique-nous la date de
            ton anniversaire !</h1>
          <div class="flex items-center justify-center gap-3 mb-5">
            <input type="text" class="flex-1 bg-gray-200 w-1/2 text-sm px-8 py-4 rounded-full outline-none"
              placeholder="Jour (facultatif)">
            <input type="text" class="flex-1 w-1/2 bg-gray-200 text-sm px-8 py-4 rounded-full outline-none"
              placeholder="Mois (facultatif)">
          </div>
          <div class="conditions flex items-center justify-center gap-3 mb-5">
            <input type="checkbox" id="cond"> <label for="cond" class="text-center text-xs">
              J’ai lu et compris l’information sur le traitement de mes données personnelles énoncée dans la <a href="#"
                class="underline">Politique de confidentialité</a> et j’accepte de recevoir des communications
              commerciales
              personnalisées de Pull&Bear par e-mail ou d’autres moyens.
            </label>
          </div>
          <SubmitBtn class="bg-black text-white w-full">I'm In</SubmitBtn>
          <button class="underline text-xs mt-5" @click="infosPanel = false">Je souhaite me désabonner</button>
        </div>
      </Transition>
    </div>
    <Transition name="menu">
      <div class="p-6 flex flex-col items-center justify-center border-t border-gray-200">
        <h1 class="font-semibold text-2xl text-center">Soldes sur la mode pour homme</h1>
        <p ref="plus" class="text-xs text-center mt-5 max-w-[550px]">{{ initText }}</p>
        <button ref="addBtn" @click="addTextToPara" class="underline">plus d'infos</button>
      </div>
    </Transition>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import SubmitBtn from "@/components/SubmitBtn.vue";
import { ref } from "vue";
import Footer from "@/components/Footer.vue";

let infosPanel = ref(false);

const showInfosPanel = () => {
  infosPanel.value = true;
}

let plus = ref("");
let addBtn = ref('');

let initText = "Renouvelle ta garde-robe avec les vêtements phares de\n" +
  "        la saison Hiver 2025. Choisis un pantalon cargo ou de\n" +
  "        jogging et porte-le avec une chemise à manches longues, un sweat, des bottes et un blouson"
let addText = "bomber pour les jours de grand froid. Pour un style plus décontracté, choisis parmi nos différents pulls en maille et jeans. Assortis-les selon tes envies. Explore toute le site et choisis les vêtements incontournables et les plus actuels pour créer tes looks de la saison.'"

const addTextToPara = () => {
  if (addBtn.value.textContent === "plus d'infos") {
    plus.value.textContent += addText;
    addBtn.value.textContent = "Réduire";
  } else {
    plus.value.textContent = initText;
    addBtn.value.textContent = "plus d'infos";
  }
}


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