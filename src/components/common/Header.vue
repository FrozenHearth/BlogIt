<template>
  <div>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar>
        <img :src="headerLogo" alt="Header Logo" width="75" height="50" />
        <v-toolbar-title class="header-title">Blog It</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="profile-icon" icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-toolbar>
    </v-card>
    <BlogSidebar :toggleDrawer="drawer" />
  </div>
</template>

<script>
import ZayaHeaderLogo from '../../assets/Zaya_Header_Logo.png';
import BlogSidebar from '../Blog/BlogSidebar';
export default {
  name: 'Header',
  data: () => ({
    headerLogo: ZayaHeaderLogo,
    drawer: false
  }),
  components: {
    BlogSidebar
  }
};
</script>

<style lang="scss" scoped>
.header-title {
  margin-left: 1em;
}
.profile-icon {
  position: absolute;
  right: 4em;
}
.blog-sidebar {
  z-index: 9999999;
}
</style>
