<template>
  <div>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar class="header-toolbar">
        <img :src="headerLogo" alt="Header Logo" width="75" height="50" />

        <v-toolbar-title
          v-ripple
          class="header-title"
          v-on:click="redirectToHomePage"
          >Blog It</v-toolbar-title
        >

        <v-spacer></v-spacer>

        <v-menu content-class="avatar-dropdown-menu">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="profile-icon" icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item class="active-link" ripple>
              <v-list-item-title @click="goToMyDrafts"
                >My Drafts</v-list-item-title
              >
            </v-list-item>
            <v-list-item class="active-link" ripple>
              <v-list-item-title @click="goToPublishedBlogs"
                >My Published</v-list-item-title
              >
            </v-list-item>
            <v-list-item class="active-link" ripple>
              <v-list-item-title @click="logout">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-toolbar>
    </v-card>
    <v-alert
      width="300"
      :style="{
        position: 'absolute',
        right: '6em',
        top: '5em'
      }"
      v-if="logoutSuccessful === true"
      type="success"
    >
      Successfully logged out.
    </v-alert>
    <BlogSidebar :toggleDrawer="drawer" />
  </div>
</template>

<script>
import ZayaHeaderLogo from '../../assets/Zaya_Header_Logo.png';
import BlogSidebar from '../common/BlogSidebar';
import { logoutService } from '../../utils/authService';
export default {
  name: 'Header',
  data: () => ({
    headerLogo: ZayaHeaderLogo,
    drawer: false,
    logoutSuccessful: false
  }),
  methods: {
    redirectToHomePage() {
      this.$router.push('/blogs');
    },
    goToMyDrafts() {
      this.$router.push('/myDrafts');
    },
    goToPublishedBlogs() {
      this.$router.push('/myPublished');
    },
    logout() {
      logoutService();
      this.logoutSuccessful = true;
      setTimeout(() => {
        this.$router.push('/');
      }, 500);
    }
  },
  components: {
    BlogSidebar
  }
};
</script>

<style lang="scss">
.header-toolbar {
  position: fixed;
  width: 100%;
  z-index: 2;
}
.header-title {
  margin-left: 1em;
  cursor: pointer;
}
.profile-icon {
  position: absolute;
  right: 4em;
}
.active-link {
  cursor: pointer;
}
.avatar-dropdown-menu {
  top: 6em !important;
}
.blog-sidebar {
  z-index: 9999999;
}
</style>
