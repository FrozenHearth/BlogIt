<template>
  <div>
    <Header />
    <AddBlog />
  </div>
</template>

<script>
import Header from '../common/Header';
import AddBlog from '../Blog/AddBlog';

export default {
  name: 'HomePage',
  components: {
    Header,
    AddBlog
  }
};
</script>
