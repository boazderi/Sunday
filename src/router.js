import { createRouter, createWebHashHistory } from 'vue-router'

import homePage from './views/home-page.vue'
import boardApp from './views/board-app.vue'
import mainTable from './views/main-table.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/board/:id',
    name: 'board',
    component: boardApp,
    // todo -more gentle routing
    children:[
      {
        path: '/board/:id/main-table',
        name: 'main-table',
        component: mainTable,
      }
    ]
  },

]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

