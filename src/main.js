import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { BASE_URL } from './common/config'



const app = createApp(App)

app.use(VueAxios, axios)

axios.defaults.baseURL = BASE_URL;

app.use(router)

app.mount('#app')
















// const app = createApp(App)

// app.use(router)

// app.mount('#app')




