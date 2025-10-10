import router from './app/router/router';
import { createPinia } from 'pinia';
import '../style.css';
import 'reflect-metadata';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconVue from '@element-plus/icons-vue';
import ru from 'element-plus/es/locale/lang/ru';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'element-plus/theme-chalk/dark/css-vars.css';

import '@/modules/shared/authentication/infrastructure/bootstrap/container'
import '@/modules/admin/projects/infrastructure/bootstrap/container'
import '@/modules/admin/profile/infrastructure/bootstrap/container'
import '@/modules/admin/levels/infrastructure/bootstrap/container'
import '@/modules/admin/questions/infrastructure/bootstrap/container'
import '@/modules/admin/achievements/infrastructure/bootstrap/container'
import '@/modules/admin/members/infrastructure/bootstrap/container'
import '@/modules/admin/customModels/infrastructure/bootstrap/container'

import 'primeicons/primeicons.css';
import Aura from '@primeuix/themes/aura';
import App from './app/App.vue';


const pinia = createPinia();
const app = createApp(App);
app.use(ToastService);

for (const [key, component] of Object.entries(ElementPlusIconVue)) {
    app.component(key, component);
}
app.use(ElementPlus, {locale: ru});


app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            cssLayer: false,
            darkModeSelector: false,
        }
    }
});

app.component('Toast', Toast);

app.use(pinia);
app.use(router);
app.mount('#app');
