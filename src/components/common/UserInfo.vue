<template>
  <div class="author-details">
    <v-avatar color="primary" min-width="36" width="36" height="36">
      <span id="author-initials" class="white--text headline ">VS</span>
    </v-avatar>
    <span class="author-name">Vishwanath B</span>
    <p class="blog-posted-date">{{ todaysDate() }}</p>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'UserInfo',
  methods: {
    todaysDate() {
      return moment(new Date()).format('DD/MM/YYYY');
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
  font-size: 1.5em;
  position: relative;
  left: 2.1em;
  bottom: 1.5em;
}
</style>
