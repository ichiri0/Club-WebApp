<script setup lang="ts">
import UserDataPage from '../components/UserDataPage.vue'

const tg = window.Telegram.WebApp
const msg = "Данные"
</script>

<template>
  <div>
    <UserDataPage :msg="msg" :tg="tg" />
  </div>
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>