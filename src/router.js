import { createRouter, createWebHistory } from 'vue-router';
import LightsPage from './components/LightsPage.vue';
import MidiPage from './components/MidiPage.vue';
import ConnectionPage from './components/ConnectionPage.vue';

const routes = [
    //{ path: '/', component: Home },
    //{ path: '/about', component: About },
    { path: "/", component: ConnectionPage },
    { path: "/lights", component: LightsPage },
    { path: "/midi", component: MidiPage },
  ]

export default createRouter({
    history: createWebHistory(),
    routes
})