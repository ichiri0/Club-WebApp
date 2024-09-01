<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore';
import { computed, onMounted } from 'vue';

const userStore = useUserStore();
const userFriend = computed(() => userStore.userFriend); // Используем computed для отслеживания изменений user
const router = useRouter();

const goToHome = () => {
  userStore.clearUserFriend();  // Clear userFriend and reset startParamHandled flag
  // alert("Очистил данные друга, иду назад");

  // If you want to navigate within your Vue app, use router.push
  router.push({ name: 'userData' });

  // If you really need to redirect to an external URL, make sure it's full
  const url = `https://t.me/testforwebappbot/clubapp`;
  window.location.href = url;
}

const messageWithFriend = () => {
  const contactUrl = `https://t.me/${userStore.userFriend?.username}?text=Крутой профиль!`
  window.location.href = contactUrl;
}


onMounted(async () => {

  // alert(JSON.stringify(userStore.userFriend))

  // await userStore.fetchUser(userFromTelegram.id);
//   if (!userStore.user) {
//     // Если пользователь не найден, создаем нового пользователя
//     const newUser = {
//       tg_user_id: userFromTelegram.id,
//       first_name: userFromTelegram.first_name,
//       last_name: userFromTelegram.last_name,
//       username: userFromTelegram.username
// };
//     await userStore.createUser(newUser);
//   }
});
</script>


<template>
  <h2>Профиль друга</h2>
  <div class="greetings">
      <div v-if="userFriend">
        <h3>Имя: <p>{{ userFriend.first_name }}</p></h3>
        <h3>Фамилия: <p>{{ userFriend.last_name }}</p></h3>
        <h3>Юзернейм: <p>@{{ userFriend.username }}</p></h3>
        <h3 v-if="userFriend.birthday">До дня рождения: {{ userFriend.birthday }}</h3>
      </div>
      <div v-else>
        <p>Данные пользователя не загружены.</p>
    </div>
      <!-- <h3>Имя: <p>{{ user.first_name }}</p></h3>
      <h3>Фамилия: <p>{{ user.last_name }}</p></h3>
      <h3>Юзернейм: <p>@{{ user.username }}</p></h3>
      <h3>До следующего дня рождения: <p>{{ user.id }}</p></h3> -->
      <!-- <h3>Имя: <p>{{ user.start_param }}</p></h3> -->
      <!-- <h3>До следующего дня рождения: <p>{{ daysUntilBirthday }}</p></h3> -->
    </div>
  <button @click="messageWithFriend">Написать</button>
  <button @click="goToHome" >Мой профиль</button>
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
