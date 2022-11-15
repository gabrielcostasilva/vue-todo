import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Amplify, { Auth } from 'aws-amplify';
import AmplifyVue from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

Amplify.configure({
    Auth: {
        region: '',
        userPoolId: '',
        userPoolWebClientId: '',
    }
});
  
const app = createApp(App)
app.use(router).use(AmplifyVue).mount('#app')
