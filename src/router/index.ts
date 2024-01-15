import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserInfoStore } from "@/stores/userInfo.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        noAuth: true
      },
      component: () => import('../views/LoginView.vue')
    }
  ]
})

const userInfoStore = useUserInfoStore();

// router.beforeEach((to, from, next) => {
//   if (to.meta.noAuth || userInfoStore.authFromLocal()) {
//     next();
//   } else {
//     router.push("/login").then(() => {});
//   }
// })

export default router
