<template>
  <div>
    <Header />
    <ListView class="list-wrapper" />
  </div>
</template>

<script>
import Header from '../components/common/Header';
import ListView from '../components/common/ListView';
export default {
  name: 'Blogs',
  components: {
    Header,
    ListView
  }
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  margin-top: 5em;
}
</style>
