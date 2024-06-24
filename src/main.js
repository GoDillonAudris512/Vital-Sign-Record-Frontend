import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

// Create app
const app = createApp(App)

// Attach router and vuex store to app
app.use(router)
app.use(store)

// Mount app
app.mount("#app")
