<template>
  <div>
    <Header />
    <PublishedDetails />
  </div>
</template>

<script>
import Header from '../common/Header';
import PublishedDetails from '../Blog/PublishedDetails';

export default {
  name: 'ViewPublished',
  components: {
    Header,
    PublishedDetails
  }
};
</script>
