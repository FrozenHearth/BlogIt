<template>
  <div v-if="isLoadingBlogs === true" class="details-loader-wrapper">
    <v-skeleton-loader
      class="title-loader"
      type="list-item"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="author-details-loader"
      type="list-item-avatar-two-line"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="image-loader"
      tile
      type="image"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="description-loader"
      type="paragraph"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="tags-list-loader"
      type="paragraph"
    ></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: 'DetailsContainerLoader',
  props: ['isLoadingBlogs']
};
</script>

<style lang="scss">
.details-loader-wrapper {
  width: 68em;
  margin: 6em auto 0 auto;
  position: relative;
  top: 4em;
}
.image-loader .v-skeleton-loader__image {
  height: 45em !important;
}
.author-details-loader {
  margin-bottom: 3em;
}
.description-loader {
  margin-top: 7em;
}
.tags-list-loader {
  margin-top: 5em;
}
</style>
