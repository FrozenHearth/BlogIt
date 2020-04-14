<template>
  <div>
    <Header />
    <BlogList class="blog-list-wrapper" />
  </div>
</template>

<script>
import Header from '../common/Header';
import BlogList from '../Blog/BlogList/BlogList';

export default {
  name: 'BlogListWrapper',
  components: {
    Header,
    BlogList
  }
};
</script>

<style lang="scss" scoped>
.blog-list-wrapper {
  margin-top: 5em;
}
</style>
