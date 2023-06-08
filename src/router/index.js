import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: { title: 'Login' },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/chats',
      name: 'Chat',
      meta: { title: 'chat' },
      component: () => import('../views/ChatView.vue')
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
      path: '/register',
      name: 'Register',
      meta: { title: 'Register' },
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')

  if (to.path === '/register' && !isAuthenticated) {
    next()
  } else if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
    return
  } else next()
})
export default router
