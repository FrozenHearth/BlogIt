<template>
  <div>
    <Header />
    <BlogDetails />
  </div>
</template>

<script>
import Header from '../common/Header';
import BlogDetails from '../Blog/BlogDetails';

export default {
  name: 'HomePage',
  components: {
    Header,
    BlogDetails
  }
};
</script>
