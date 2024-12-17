import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCoffee, faUser, faTrash , faPenToSquare,  faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import { createPinia } from 'pinia'

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; 


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

library.add(faCoffee, faUser, faTrash , faPenToSquare, faTriangleExclamation); // Add icons to the library

const app = createApp(App);
const pinia = createPinia()
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(Toast); // Use the Toast plugin
app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount('#app');
