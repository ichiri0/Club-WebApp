import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { 
      id: BigInt; 
      tg_user_id: BigInt; 
      first_name: BigInt;
      last_name: BigInt; 
      username: BigInt; 
      birthday?: string 
    } | null,  
    userFriend: null as { 
      id: BigInt; 
      tg_user_id: BigInt; 
      first_name: BigInt;
      last_name: BigInt; 
      username: BigInt; 
      birthday?: string 
    } | null,  
    startParamHandled: false,

  }),

  actions: {
    async getUserFriendData(id: string) {
      if (!this.startParamHandled) {
      try {
        const response = await fetch(`https://ichiri0server.ru/users/tg/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        // alert(response)
        if (response.ok) {
          this.userFriend = await response.json()
        } else {
          this.userFriend = null
        }
        this.startParamHandled = true
      } catch (error) {
        // alert("ошибка" + error.message)
        console.error('Ошибка сети:', error)
      }

    }
    },

    clearUserFriend() {
      this.userFriend = null;
      this.startParamHandled = false; // Reset the flag when clearing userFriend
    },

    async fetchUser(id: string) {
      try {
        const response = await fetch(`https://ichiri0server.ru/users/tg/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        // alert(response)
        if (response.ok) {
          this.user = await response.json()
        } else {
          this.user = null
        }
      } catch (error) {
        // alert("ошибка" + error.message)
        console.error('Ошибка сети:', error)
      }
    },
    async createUser(user: any) {
      try {
        const response = await fetch(`https://ichiri0server.ru/users/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        })
        if (response.ok) {
          this.user = await response.json()
        }
      } catch (error) {
        console.error('Ошибка сети:', error)
      }
    },
    async updateUser(user: any) {
      try {
        // alert("Обновляем юзера")
        const response = await fetch(`https://ichiri0server.ru/users/tg/${user.tg_user_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });
        if (response.ok) {
          this.user = await response.json();
        } else {
          alert('Не удалось обновить пользователя.');
        }
      } catch (error) {
        alert("Ошибка при обновлении пользователя: " + error.message);
        console.error('Ошибка сети:', error);
      }
    },
  },
})
