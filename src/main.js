import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Amplify, Auth } from 'aws-amplify';  

Amplify.configure({
    Auth: {
        region: process.env.VUE_APP_REGION,
        userPoolId: process.env.VUE_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.VUE_APP_USER_POOL_WEB_CLIENT_ID,
    }
});
  
const app = createApp(App)

app.use(router).mount('#app')
