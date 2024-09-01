<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DatePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/dist/style.css'

import { useUserStore } from '../stores/userStore';

const selectedDate = ref<Date | null>(null);
const router = useRouter();
const userStore = useUserStore();

const submitDate = async () => {
  if (selectedDate.value && userStore.user) {
    // alert("Тык");

    const date = new Date(selectedDate.value);
    const dateStr = date.toISOString().split('T')[0]; // Extracts the date in the format YYYY-MM-DD

    // alert("Взяли дату: " + dateStr);
    // alert(`Юзер с хранилища: ${userStore.user.tg_user_id}`);
    const updatedUser = {
      tg_user_id: userStore.user.tg_user_id,
      first_name: userStore.user.first_name,
      last_name: userStore.user.last_name,
      username: userStore.user.username,
      birthday: dateStr,
    };

    // alert(`Данные пользователя для обновления: ${JSON.stringify(updatedUser)}`);

    try {
      await userStore.updateUser(updatedUser);
      // alert("Пользователь успешно обновлен!");
      router.push({ name: 'userData' });
    } catch (error) {
      alert("Ошибка при обновлении пользователя: " + error.message);
    }
  } else {
    alert("Не выбрана дата или пользователь не найден");
  }
};



onMounted(async () => {
  if (!userStore.user) {
    router.push({ name: 'userData' });
  }
})

</script>

<template>
  <div class="date-picker-block">
    <DatePicker v-model="selectedDate"
      format="DD-MMMM-YYYY"
      align="center"
      :touch-sensitivity="1"
      :pattern="{ dividerDate: ' ' }"
      class="date-picker"
      style="font-size: 25pt;"
    />
  </div>
  <p>{{ selectedDate }}</p>
  <button
    @click="submitDate"
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

.vue-scroll-picker-layer-bottom {
  box-sizing: border-box;
  border-bottom: 1px solid #c8c7cc;
  
  background: #4caf50 !important;
  top: 0;
  height: calc(50% - 1em);
  cursor: pointer;
}



.date-picker {
  background-color: #5a0000 !important; /* Ensure background is transparent */
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  height: 10em;  
  
  margin-top: 10%;
}

.v-drumroll-picker {
  vertical-align: center;
  background: #c4070700 !important; /* Ensure the background is transparent */
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  
  justify-content: center;
  overflow: visible;
  position: relative;

}
.v-drumroll-picker-layer-top {
  box-sizing: border-box;
  border-bottom: 1px solid #c8c7cc;
  background: transparent !important;
  
  top: 0;
  height: calc(50% - 1em);
  cursor: pointer;
}
button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ffffff;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: large;
  font-weight: bold;
  border-radius: 100px;
  color: rgb(0, 0, 0);
  border: none;
  width: 100%;
  height: 40pt;
  cursor: pointer;
}

button:disabled {
  background-color: #c8c8c8;
  cursor: not-allowed;
}

@media screen and (max-width: 960px) {
  
  
}
</style>