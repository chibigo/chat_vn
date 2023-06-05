import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      meta: { title: 'About' },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/videos',
      name: 'Videos',
      meta: { title: 'Videos' },
      component: () => import('../views/VideoView.vue')
    },
    {
      path: '/photos',
      name: 'Photos',
      meta: { title: 'Photos' },
      component: () => import('../views/PhotoView.vue')
      // children: [
      //   {
      //     path: 'mail',
      //     name: 'Mail',
      //     component: () => import('../views/PhotoView.vue'),
      //   }
      // ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
