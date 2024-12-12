import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import router from './router';
import './assets/tailwind.css'; // Import Tailwind CSS
import { useAuthStore } from '@/stores/auth';
// Import translation files for English
import enCommon from './locales/en/common.json';
import enProfile from './locales/en/profile.json';
// Import translation files for Hindi
import hiCommon from './locales/hi/common.json';
import hiProfile from './locales/hi/profile.json';

const messages = {
    en: {
        ...enCommon,
        ...enProfile,
    },
    hi: {
        ...hiCommon,
        ...hiProfile,
    },
};

const savedLanguage = localStorage.getItem('language') || 'en';

const i18n = createI18n({
    locale: savedLanguage,
    fallbackLocale: 'en',
    messages,
});

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.use(router);
const authStore = useAuthStore();
authStore.initSession();
app.mount('#app');
