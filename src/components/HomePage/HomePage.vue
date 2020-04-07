<template>
  <div>
    <Header />
    <BlogList />
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
