<template>
  <div>
    <Header />
    <ModifyComment />
  </div>
</template>

<script>
import Header from '../components/common/Header';
import ModifyComment from '../components/comments/ModifyComment';
export default {
  name: 'ModifyComments',
  components: {
    Header,
    ModifyComment
  }
};
</script>
