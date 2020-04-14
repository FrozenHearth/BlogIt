<template>
  <div>
    <Header />
    <PublishedDetails />
  </div>
</template>

<script>
import Header from '../common/Header';
import PublishedDetails from '../Blog/MyPublishedDetails/PublishedDetails';

export default {
  name: 'MyPublishedDetailsWrapper',
  components: {
    Header,
    PublishedDetails
  }
};
</script>
