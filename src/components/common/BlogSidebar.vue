<template>
  <v-navigation-drawer
    width="300"
    class="side-nav-drawer"
    v-model="toggleDrawer"
    app
    fixed
    right
  >
    <v-list dense>
      <v-list-item class="side-nav-items">
        <v-icon class="search-icon">mdi-magnify</v-icon>
        <v-text-field type="text" label="Search" solo> </v-text-field>
      </v-list-item>
      <v-list-item>
        <div class="tags-list">
          <v-chip
            v-for="(tag, index) in tags.slice(0, 10)"
            :key="index"
            outlined
            class="tags-container ma-2"
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { bus } from '../../main';
export default {
  props: ['source', 'toggleDrawer'],
  data() {
    return {
      drawer: this.toggleDrawer,
      isClosed: false,
      tags: []
    };
  },
  mounted() {
    bus.$on('tagList', tags => {
      this.tags = tags;
    });
  }
};
</script>
<style lang="scss" scoped>
.side-nav-drawer {
  top: 6.5em !important;
}
.side-nav-items {
  position: relative;
  margin-top: 5em;
}
.search-icon {
  position: absolute;
  bottom: 1.7em;
  right: 1em;
  z-index: 10;
}
.tags-list {
  display: flex;
  flex-wrap: wrap;
  text-transform: capitalize;
}
</style>
