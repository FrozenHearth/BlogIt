<template>
  <div>
    <Header />
    <DetailsView />
  </div>
</template>

<script>
import Header from '../components/common/Header';
import DetailsView from '../components/common/DetailsView';
export default {
  name: 'Details',
  components: {
    Header,
    DetailsView
  }
};
</script>
