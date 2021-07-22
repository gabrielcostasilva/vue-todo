import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Amplify, { Auth } from 'aws-amplify';

import { 
    applyPolyfills,
    defineCustomElements
  } from '@aws-amplify/ui-components/loader';
  

Amplify.configure({
    Auth: {
        region: '',
        userPoolId: '',
        userPoolWebClientId: '',
    }
});

applyPolyfills().then(() => {
    defineCustomElements(window);
  });
  
const app = createApp(App)

app.config.isCustomElement = tag => tag.startsWith('amplify-');
app.use(router).mount('#app')
