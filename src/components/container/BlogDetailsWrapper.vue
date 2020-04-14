<template>
  <div>
    <Header />
    <BlogDetails />
  </div>
</template>

<script>
import Header from '../common/Header';
import BlogDetails from '../Blog/BlogDetails/BlogDetails';

export default {
  name: 'BlogDetailsWrapper',
  components: {
    Header,
    BlogDetails
  }
};
</script>
