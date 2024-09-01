import { createRouter, createWebHistory } from 'vue-router'
import SelectDate from '../views/SelectDateView.vue'
import UserDataComponent from '../views/UserDataView.vue';
import UserFriendDataComponent from '../views/UserFriendDataView.vue';


const routes = [
  { 
    path: '/',
    name: 'userData',
    component: UserDataComponent
  },
  { 
    path: '/user-data-friend',
    name: 'userDataFriend',
    component: UserFriendDataComponent 
  },
  { 
    path: '/select-date',
    name: 'selectDate',
    component: SelectDate 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
