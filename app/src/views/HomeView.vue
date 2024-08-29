<script setup lang="ts">
import UserDataPage from '../components/UserDataPage.vue'
import SelectDate from '../components/SelectDate.vue'

</script>

<template>
  <main>
    <SelectDate/>
    <!-- <UserDataPage :msg="msg" :tg="tg" /> -->
  </main>
</template>



<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  main {
    display: flex;
    align-items: center;
  }
}
</style>
