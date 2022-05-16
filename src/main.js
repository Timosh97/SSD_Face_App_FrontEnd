import { createApp } from 'vue';
import App from './App.vue';
import mitt from 'mitt';

import './index.css';
import store from './store/index.js';
import router from './router/index.js';

const app = createApp(App);
const eventBus = mitt();
app.config.globalProperties.eventBus = eventBus;
app.use(router).use(store).mount('#app');
