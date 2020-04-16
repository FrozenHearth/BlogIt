<template>
  <div id="app">
    <v-app>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      <router-view />
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    token: localStorage.getItem('user-token')
  }),
  created() {
    axios.defaults.baseURL = 'https://blog-api-ver1.herokuapp.com';
    if (this.token) {
      axios.defaults.headers.common = { Authorization: `Token ${this.token}` };
      if (this.$route.path === '/') this.$router.push('/blogs');
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 10px;
}
</style>
