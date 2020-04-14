<template>
  <div>
    <Header />
    <MyDraftsList class="blog-list-wrapper" />
  </div>
</template>

<script>
import Header from '../common/Header';
import MyDraftsList from '../Blog/MyDrafts/MyDraftsList';

export default {
  name: 'MyDraftsWrapper',
  components: {
    Header,
    MyDraftsList
  }
};
</script>

<style lang="scss" scoped>
.blog-list-wrapper {
  margin-top: 10em;
}
</style>
