<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { DatePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/dist/style.css'
import type { LanguageServiceMode, LanguageVariant } from 'typescript';

// Define a reactive reference for the selected date
const selectedDate = ref<Date | null>(null)

const router = useRouter()

// Function to navigate to the UserDataPage with the selected date
const goToUserDataPage = () => {
  if (selectedDate.value) {
    // Ensure selectedDate is a Date object
    const date = new Date(selectedDate.value)
    if (!isNaN(date.getTime())) {
      const dateStr = date.toISOString() // Convert to ISO string
      // Navigate to UserDataPage and pass the selected date as a query parameter
      router.push({
        name: 'UserDataPage',
        query: { date: dateStr }
      })
    } else {
      console.error('Selected date is not valid:', selectedDate.value)
    }
  } else {
    console.error('No date selected.')
  }
}
</script>

<template>
  <!-- DatePicker component bound to the selectedDate ref -->
  <div class="date-picker-block">
    <DatePicker v-model="selectedDate"
      format="DD-MMMM-YYYY"
      align="center"
      height="6em"
      :touch-sensitivity="1"
      :pattern="{
        dividerDate: ' '
      }"
      class="date-picker"
      style="font-size: 22pt; background-color:black"a >
      
    </DatePicker>
</div>
  <p>{{ selectedDate }}</p>
  <!-- Button to trigger navigation -->
  <button
    @click="goToUserDataPage"
    :disabled="!selectedDate"
    class="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out"
  >
    Продолжить
  </button>
</template>

<style scoped>

.date-picker-block {
  background-color: transparent;
}

.date-picker {
  background-color: transparent; /* Set the background to transparent */
  margin-bottom: 20px; /* Ensure spacing between DatePicker and button */
}


button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #c8c8c8;
  cursor: not-allowed;
}
</style>
