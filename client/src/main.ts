import './assets/main.css';
import 'vue3-toastify/dist/index.css';
import '@vuepic/vue-datepicker/dist/main.css';

import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth';
import Notiflix from 'notiflix';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

Notiflix.Confirm.init({
  titleFontSize: '20px',
  titleColor: 'teal',
  okButtonBackground: 'teal',
  cancelButtonBackground: 'red',
});

const toastOptions: ToastContainerOptions = {
  autoClose: 2500,
  closeButton: false,
  closeOnClick: true,
  hideProgressBar: true,
  transition: 'bounce',
  position: 'top-right',
  theme: 'dark',
};

const queryClient = new QueryClient();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toastify, toastOptions);
app.use(VueQueryPlugin, { queryClient, enableDevtoolsV6Plugin: true });

app.mount('#app');

const authStore = useAuthStore();

// Initialize the user state on app load
authStore.initializeUser();
