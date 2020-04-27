<template>
  <div>
    <Header />
    <DetailsContainer />
  </div>
</template>

<script>
import Header from '../components/common/Header';
import DetailsContainer from '../components/common/Details/DetailsContainer';
export default {
  name: 'Details',
  components: {
    Header,
    DetailsContainer
  }
};
</script>
