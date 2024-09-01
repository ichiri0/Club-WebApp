<script setup lang="ts">
import DatePickerComponent from './DatePickerComponent.vue';

</script>

<template>
  <div class="greetings">
    <h2>Введи свою дату рождения</h2>
    <DatePickerComponent/>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h2 {
  font-weight: bold;
  font-size: 3em;
  position: relative;
  text-align: center;
  top: -10px;
  color: #fff !important;
  
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>
