import { createRouter, createWebHistory } from 'vue-router';
import LightsPage from './views/AddEndpointPage.vue';
import MidiPage from './views/MidiPage.vue';
import ConnectionPage from './views/ConnectionPage.vue';

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