<template>
  <div>
    <Header />
    <BlogList class="blog-list-wrapper" />
  </div>
</template>

<script>
import Header from '../components/common/Header';
import BlogList from './Blogs/BlogList';
export default {
  name: 'Blogs',
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
