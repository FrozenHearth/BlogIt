<template>
  <v-navigation-drawer
    height="100%"
    v-model="toggleDrawer"
    fixed
    temporary
    right
  >
    <v-list-item> </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item>
        <v-list-item-content>
          <v-icon class="search-icon">mdi-magnify</v-icon>
          <v-text-field type="text" label="Search" solo> </v-text-field>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <h1>Tags</h1>
        <div class="text-center">
          <v-chip class="ma-2" outlined>
            Tags
          </v-chip>
          <v-chip class="ma-2" outlined>
            Tags
          </v-chip>
          <v-chip class="ma-2" outlined>
            Tags
          </v-chip>
          <v-chip class="ma-2" outlined>
            Tags
          </v-chip>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    toggleDrawer: Boolean
  },
  data() {
    return {
      drawer: this.toggleDrawer
    };
  }
};
</script>

<style>
.search-icon {
  position: relative;
  top: 1.6em;
  left: 4em;
  z-index: 10;
}
.tags-container {
  position: relative;
  top: 7em;
  left: -6em;
}
</style>
