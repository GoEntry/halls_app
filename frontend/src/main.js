import { createApp } from 'vue';
import router from './router';
import AOS from 'aos';
import App from './App.vue';

import 'aos/dist/aos.css';
import 'normalize.css';
import './fonts/fonts.css';
import './common.css';

const app = createApp(App);
app.use(router);
app.use(AOS.init());
app.mount('#app');
