<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const userStore = useUserStore();
const user = computed(() => userStore.user); // Используем computed для отслеживания изменений user
const router = useRouter();

const remainingTime = ref<string>('');

const calculateTimeUntilBirthday = () => {
  if (!user.value || !user.value.birthday) return '';

  const today = new Date();
  const birthday = new Date(user.value.birthday);
  birthday.setFullYear(today.getFullYear());

  if (birthday < today) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const timeDiff = birthday.getTime() - today.getTime();
  
  if (timeDiff <= 0) {
    return 'У вас сегодня день рождения!';
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `До дня рождения: ${days} дней ${hours} часов, ${minutes} минут, ${seconds} секунд`;
}

const updateRemainingTime = () => {
  remainingTime.value = calculateTimeUntilBirthday();
}

let intervalId: number | undefined;

const shareLink = () => {
  if (!user.value) return; // Проверка на null перед использованием
  const url = encodeURIComponent(`t.me/testforwebappbot/clubapp?startapp=${user.value.tg_user_id}`);
  const text = encodeURIComponent("Посмотри мой профиль!");
  const telegramShareUrl = `https://telegram.me/share/url?url=${url}&text=${text}`;
  window.location.href = telegramShareUrl;
}

const goToSelectDate = () => {
  router.push({
    name: 'selectDate',
  });
}

onMounted(async () => {
  const tgDataUnsafe = window.Telegram.WebApp.initDataUnsafe
  const userFromTelegram = tgDataUnsafe.user;
  const userFriendId = tgDataUnsafe.start_param
  updateRemainingTime();
  intervalId = setInterval(updateRemainingTime, 1000);
  if (userFriendId) {
    userStore.getUserFriendData(userFriendId);
    router.push({ name: 'userDataFriend' });
  }

  await userStore.fetchUser(userFromTelegram.id);
  if (!userStore.user) {
    // Если пользователь не найден, создаем нового пользователя
    const newUser = {
      tg_user_id: userFromTelegram.id,
      first_name: userFromTelegram.first_name,
      last_name: userFromTelegram.last_name,
      username: userFromTelegram.username
};
    await userStore.createUser(newUser);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

</script>


<template>
  <h2>Профиль</h2>
  <div class="greetings">
      <div v-if="user">
        <h3>Имя: <p>{{ user.first_name }}</p></h3>
        <h3>Фамилия: <p>{{ user.last_name }}</p></h3>
        <h3>Юзернейм: <p>@{{ user.username }}</p></h3>
        <h3 v-if="remainingTime">{{ remainingTime }}</h3>
      </div>
      <div v-else>
        <p>Данные пользователя не загружены.</p>
    </div>
    </div>
  <button @click="shareLink">Поделиться</button>
  <button @click="goToSelectDate" >Выбрать дату</button>
</template>


<style scoped>
h2 {
  font-weight: bold;
  font-size: 3em;
  position: relative;
  text-align: center;
  top: -10px;
  color: #fff !important;
  
}

p {
  font-weight: bold;
  font-size: 1em;
  position: relative;
  color: #fff;
  text-align: center;
}

h3 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}
.greetings {
  background-color: #000000a8;
  border-radius: 40px;
  height: 400px;
  display: grid;
  align-items: center;
}
.greetings h1,
.greetings h3 {
  text-align: center;
  
}


button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ffffff;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: large;
  font-weight: bold;
  border-radius: 100px;
  border: none;
  width: 100%;
  height: 40pt;
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
