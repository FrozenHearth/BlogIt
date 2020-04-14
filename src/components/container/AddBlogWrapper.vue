<template>
  <div>
    <Header />
    <AddBlog />
  </div>
</template>

<script>
import Header from '../common/Header';
import AddBlog from '../Blog/CreateBlog/AddBlog';

export default {
  name: 'AddBlogWrapper',
  components: {
    Header,
    AddBlog
  }
};
</script>
