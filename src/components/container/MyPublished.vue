<template>
  <div>
    <Header />
    <PublishedBlogList class="blog-list-wrapper" />
  </div>
</template>

<script>
import Header from '../common/Header';
import PublishedBlogList from '../Blog/PublishedBlogList';

export default {
  name: 'MyPublished',
  components: {
    Header,
    PublishedBlogList
  }
};
</script>

<style lang="scss" scoped>
.blog-list-wrapper {
  margin-top: 10em;
}
</style>
