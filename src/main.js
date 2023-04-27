import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Amplify, Auth } from 'aws-amplify';

// import { 
//     applyPolyfills,
//     defineCustomElements
//   } from '@aws-amplify/ui-components/loader';
  

Amplify.configure({
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_0AifnDPgu',
        userPoolWebClientId: '2omkf239lb44dkcvkq5s76f30k',
    }
});

// applyPolyfills().then(() => {
//     defineCustomElements(window);
//   });
  
const app = createApp(App)

// app.config.isCustomElement = tag => tag.startsWith('amplify-');
app.use(router).mount('#app')
