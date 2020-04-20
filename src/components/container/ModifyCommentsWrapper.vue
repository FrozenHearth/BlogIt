<template>
  <div>
    <Header />
    <ModifyComment />
  </div>
</template>

<script>
import Header from '../common/Header';
import ModifyComment from '../Comments/ModifyComment';

export default {
  name: 'ModifyCommentsWrapper',
  components: {
    Header,
    ModifyComment
  }
};
</script>

<style lang="scss" scoped>
// .blog-list-wrapper {
//   margin-top: 5em;
// }
</style>
