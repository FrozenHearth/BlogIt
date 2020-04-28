<template>
  <div>
    <div v-if="isLoadingBlogs === true" class="list-card-loader-wrapper">
      <v-skeleton-loader
        v-for="n in blogsLength"
        :key="n"
        tile
        class="list-card-loader"
        type="image"
      ></v-skeleton-loader>
    </div>
    <div
      v-if="searchingBlogs === true && blogSearchResultLength > 0"
      class="list-card-loader-wrapper"
    >
      <v-skeleton-loader
        v-for="n in blogSearchResultLength"
        :key="n"
        tile
        class="list-card-loader"
        type="image"
      ></v-skeleton-loader>
    </div>
    <p
      class="text-center search-result-msg"
      v-if="blogSearchResultLength === 0"
    >
      No Blogs matching the search term!
    </p>
  </div>
</template>

<script>
export default {
  name: 'CardListLoader',
  props: [
    'isLoadingBlogs',
    'searchingBlogs',
    'blogSearchResultLength',
    'blogsLength'
  ]
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
.search-result-msg {
  font-size: 1.5em;
  position: relative;
  top: 2em;
}
</style>
