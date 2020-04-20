<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    token: localStorage.getItem('user-token')
  }),
  created() {
    if (this.token) {
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
