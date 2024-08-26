import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './style-settings.css'
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './HomePage.vue';
import SettingsPage from './SettingsPage.vue'; 

const routes = [
    { path: '/', component: HomePage },  // Ruta pentru pagina principală
    { path: '/settings', component: SettingsPage } // Ruta pentru pagina de setări
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
