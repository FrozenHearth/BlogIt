<template>
  <v-app>
    <div class="home">
      <Login />
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';

export default {
  name: 'Home',
  components: {
    Login
  }
};
</script>
