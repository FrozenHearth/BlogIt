<template>
  <div>
    <Header />
    <AddBlog />
  </div>
</template>

<script>
import Header from '../components/common/Header';
import AddBlog from './Blogs/AddBlog';
export default {
  name: 'CreateBlog',
  components: {
    Header,
    AddBlog
  }
};
</script>
