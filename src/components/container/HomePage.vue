<template>
  <div>
    <Header />
    <BlogList class="blog-list-wrapper" />
  </div>
</template>

<script>
import Header from '../common/Header';
import BlogList from '../Blog/BlogList';

export default {
  name: 'HomePage',
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
