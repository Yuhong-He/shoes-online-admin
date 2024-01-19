import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserInfoStore } from "@/stores/userInfo.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home/admin-home"
    },
    {
      path: '/home',
      name: 'home',
      redirect: "/home/admin-home",
      component: HomeView,
      children: [
        {
          path: "admin-home",
          name: "admin-home",
          component: () => import("@/components/home/AdminHome.vue")
        },
        {
          path: "users",
          name: "users",
          component: () => import("@/components/users/UserManagement.vue")
        },
        {
          path: "goods",
          name: "goods",
          component: () => import("@/components/goods/GoodsManagement.vue")
        }
      ]
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

router.beforeEach((to, from, next) => {
  if (to.meta.noAuth || userInfoStore.authFromLocal()) {
    next();
  } else {
    router.push("/login").then(() => {});
  }
})

export default router
