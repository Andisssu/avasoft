import './index.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import axios from 'axios';
import './assets/output.css';
import "preline/preline";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router); // Use VueRouter
app.mount('#app');
