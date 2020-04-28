<template>
  <div>
    <v-card color="grey lighten-4">
      <v-toolbar class="header-toolbar" flat tile>
        <img
          class="header-logo"
          :src="headerLogo"
          alt="Header Logo"
          width="70"
          height="50"
        />

        <v-toolbar-title
          v-ripple
          class="header-title"
          @click="redirectToHomePage"
          >Blog It</v-toolbar-title
        >

        <v-spacer></v-spacer>

        <v-menu content-class="avatar-dropdown-menu">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="profile-icon" icon>
              <v-avatar
                class="header-user-avatar"
                min-width="36"
                width="36"
                height="36"
              >
                <span id="user-initials-header" class="white--text headline ">{{
                  username.substring(0, 2).toUpperCase()
                }}</span>
              </v-avatar>
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
              <v-list-item-title @click.stop="dialog = true"
                >Logout</v-list-item-title
              >
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to log out?</v-card-title
                  >

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="logout-btn" outlined @click="logout">
                      Logout
                    </v-btn>

                    <v-btn class="cancel-btn" outlined @click="dialog = false">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn icon @click.stop="drawer = !drawer"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
        <!-- <v-app-bar-nav-icon ></v-app-bar-nav-icon> -->
      </v-toolbar>
    </v-card>
    <v-alert
      width="300"
      class="alert-banner-logout"
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
export default {
  name: 'Header',
  data: () => ({
    headerLogo: ZayaHeaderLogo,
    drawer: false,
    logoutSuccessful: false,
    dialog: false,
    username: localStorage.getItem('username')
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
      this.dialog = false;
      localStorage.removeItem('user-token');
      localStorage.removeItem('username');
      this.logoutSuccessful = true;
      setTimeout(() => {
        this.$router.push('/login');
      }, 1000);
    }
  },
  components: {
    BlogSidebar
  }
};
</script>

<style lang="scss" scoped>
.header-toolbar {
  position: fixed;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 35%,
    rgba(136, 200, 238, 1) 85%,
    rgba(199, 228, 246, 1) 100%
  );

  width: 100%;
  z-index: 2;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
}
.header-logo {
  position: relative;
  left: 8em;
}
.header-title {
  margin-left: 5em;
  cursor: pointer;
}
.header-user-avatar {
  background: #3ca8e8;
}
.logout-btn {
  background: #4ca97c;
  color: white !important;
  text-transform: capitalize;
  font-size: 1.4em;
}
.cancel-btn {
  background: #ff5252;
  color: white !important;
  text-transform: capitalize;
  font-size: 1.4em;
}
#user-initials-header {
  font-size: 0.8em !important;
  font-weight: 600 !important;
}
.alert-banner-logout {
  position: absolute;
  right: 6em;
  top: 5em;
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
