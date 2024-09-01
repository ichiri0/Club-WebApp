<script setup lang="ts">
import SelectDateComponent from '../components/SelectDateComponent.vue';
</script>

<template>
  <div class="about">
    
    <SelectDateComponent/>
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
