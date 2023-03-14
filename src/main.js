import { createApp } from 'vue'
import App from './App.vue'

import { store } from './store.js';

import Router from './router.js';

let app = createApp(App);
app.use(Router);
app.use(store);
app.mount('#app')
