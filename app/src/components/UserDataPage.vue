<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const dateStr = route.query.date as string

defineProps<{
  msg: string,
  tg: any
}>()

const router = useRouter()

// Преобразуем выбранную дату в объект Date
const selectedDate = new Date(dateStr)
const today = new Date()

// Определяем следующий день рождения
let nextBirthday = new Date(today.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())

// Если день рождения уже прошел в этом году, добавляем один год
if (nextBirthday < today) {
  nextBirthday.setFullYear(today.getFullYear() + 1)
}

// Проверка на день рождения
let daysUntilBirthday = ''
if (today.getDate() === selectedDate.getDate() && today.getMonth() === selectedDate.getMonth()) {
  daysUntilBirthday = 'С днём рождения!'
} else {
  // Вычисляем разницу в днях
  const timeDifference = nextBirthday.getTime() - today.getTime()
  daysUntilBirthday = `${Math.ceil(timeDifference / (1000 * 60 * 60 * 24))} д.`
}
const goToSelectDatePage = () => {
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
    <p>Имя: {{ tg.initDataUnsafe.user.first_name }}</p>
    <p>Фамилия: {{ tg.initDataUnsafe.user.last_name }}</p>
    <p>Юзернейм: @{{ tg.initDataUnsafe.user.username }}</p>
    <p>До следующего дня рождения: {{ daysUntilBirthday }}</p>
    <button @click="goToSelectDatePage">Выбрать дату</button>
  </div>
</template>



<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.date-picker {
  margin-top: 20px;
  text-align: center;
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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
