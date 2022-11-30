import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'


import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'
import { edit, icon } from './directives.js'

const app = createApp(rootCmp)

// Directives
app.directive('edit', edit)
app.directive('icon', icon)

app.use(router)
app.use(store)

app.mount('#app')
