<template>
  <div v-if="isLoadingBlogs === true" class="list-card-loader-wrapper">
    <v-skeleton-loader
      v-for="n in blogsLength"
      :key="n"
      tile
      class="list-card-loader"
      type="image"
    ></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: 'CardListLoader',
  props: ['isLoadingBlogs', 'blogsLength']
};
</script>

<style lang="scss">
.list-card-loader-wrapper .v-skeleton-loader__image {
  min-height: 24em !important;
}
.list-card-loader {
  max-width: 65em;
  margin: 2.5em auto 2em auto;
  position: relative;
  left: 2em;
}
</style>
