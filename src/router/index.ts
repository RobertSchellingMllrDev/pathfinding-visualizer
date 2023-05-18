import { createRouter, createWebHistory } from 'vue-router'
import BaseGraphVue from '@/components/Graph/BaseGraph.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BaseGraphVue
    }
  ]
})

export default router
