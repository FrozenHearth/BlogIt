<template>
  <div>
    <v-avatar default color="primary" min-width="36" width="36" height="36">
      <span id="author-initials" class="white--text headline ">{{
        initials ? initials.substring(0, 2).toUpperCase() : 'N/A'
      }}</span>
    </v-avatar>
    <span class="author-name">{{
      initials ? initials.charAt(0).toUpperCase() + initials.slice(1) : 'N/A'
    }}</span>
    <p class="blog-posted-date">{{ todaysDate() }}</p>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'UserInfo',
  props: ['initials', 'datePosted'],
  methods: {
    todaysDate() {
      if (this.datePosted) {
        return moment(this.datePosted).format('DD/MM/YYYY');
      } else {
        return 'N/A';
      }
    }
  }
};
</script>

<style lang="scss">
#author-initials {
  font-size: 1.3em !important;
}
.author-name {
  font-size: 1.5em;
  font-weight: 500;
  position: relative;
  left: 1em;
  bottom: 0.5em;
}
.blog-posted-date {
  font-size: 1.3em;
  position: relative;
  left: 3em;
  bottom: 1.5em;
}
</style>
