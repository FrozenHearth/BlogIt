<template>
  <v-content>
    <div class="card-list-container">
      <h1 class="card-list-container-title">My Drafts</h1>
      <MyDraftsCard />
      <div class="text-center pagination-container">
        <v-pagination
          @input="next"
          v-model="page"
          :length="4"
          circle
        ></v-pagination>
      </div>
    </div>
  </v-content>
</template>

<script>
import MyDraftsCard from './MyDraftsCard';

export default {
  name: 'MyDraftsList',
  components: {
    MyDraftsCard
  },

  data() {
    return {
      page: 1
    };
  },
  methods: {
    next() {
      console.log(this.page);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-list-container {
  position: relative;
  top: 5em;
}
.card-list-container-title {
  position: absolute;
  left: 3em;
  font-size: 2.5em;
  font-weight: 400;
}
.new-blog-btn {
  float: right;
  position: relative;
  right: 7em;
}
.pagination-container {
  margin-top: 5em;
  margin-bottom: 5em;
}
</style>
