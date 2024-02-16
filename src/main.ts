import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import store from './pinia'
import router from './router'
import icons from './icons'

import App from './App.vue'

createApp(App).use(store).use(router).use(icons).mount('#app')
