<template>
  <div>
    <Header />
    <DetailsView />
  </div>
</template>

<script>
import Header from '../common/Header';
import DetailsView from '../common/DetailsView';

export default {
  name: 'DetailsWrapper',
  components: {
    Header,
    DetailsView
  }
};
</script>
