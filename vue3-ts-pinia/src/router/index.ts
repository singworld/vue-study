import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/exercises/pinia-counter'
    },
    {
      path: '/exercises/pinia-counter',
      name: 'pinia-counter',
      component: () => import('../views/exercises/PiniaCounterView.vue')
    },
    {
      path: '/exercises/pinia-channel',
      name: 'pinia-channel',
      component: () => import('../views/exercises/PiniaChannelView.vue')
    },
    {
      path: '/exercises/props-emits',
      name: 'props-emits',
      component: () => import('../views/exercises/PropsEmitsView.vue')
    },
    {
      path: '/exercises/ref-type',
      name: 'ref-type',
      component: () => import('../views/exercises/RefTypeView.vue')
    }
  ]
})

export default router
