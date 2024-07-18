import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

export { Toastify };