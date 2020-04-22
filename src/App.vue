<template>
  <div id="app">
    <v-app>
      <router-view :key="$route.fullPath" />
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

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(0, 0, 0, 0.84);
  font-size: 10px;
}
</style>
