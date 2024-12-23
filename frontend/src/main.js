import { createApp } from 'vue';
import router from './router';
import AOS from 'aos';
import App from './App.vue';

import 'aos/dist/aos.css';
import 'normalize.css';
import './common.css';
import './fonts.css';

const app = createApp(App);
app.use(router);
app.use(AOS.init());
app.mount('#app');
