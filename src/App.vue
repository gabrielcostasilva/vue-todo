<template>
  <authenticator :sign-up-attributes="['given_name']">

  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/contact">Contact</router-link>
  </div>
  <router-view />

    <amplify-sign-out></amplify-sign-out>
  
  </authenticator>
</template>

<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import { Auth } from 'aws-amplify';
import "@aws-amplify/ui-vue/styles.css";

Auth.currentAuthenticatedUser().then(userAttrs => console.log(userAttrs['username']));

</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  background: #f2f2f2;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
