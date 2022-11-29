import { createRouter, createWebHashHistory } from 'vue-router'

import homePage from './views/home-page.vue'
import chat from './views/chat.vue'
import boardApp from './views/board-app.vue'
import mainTable from './views/main-table.vue'
import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/board',
    name: 'board',
    component: boardApp,
    children:[
      {
        path: '/',
        name: 'main-table',
        component: mainTable,
      }
    ]
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

