<template>
  <div>
    <Header />
    <DraftsDetails />
  </div>
</template>

<script>
import Header from '../common/Header';
import DraftsDetails from '../Blog/MyDraftsDetails/DraftsDetails';

export default {
  name: 'MyMyDraftsDetailsWrapper',
  components: {
    Header,
    DraftsDetails
  }
};
</script>
