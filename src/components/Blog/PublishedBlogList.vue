<template>
  <v-content>
    <div class="card-list-container">
      <h1 class="card-list-container-title">My Published</h1>
      <MyPublishedCard />
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
import MyPublishedCard from './MyPublishedCard';

export default {
  name: 'PublishedBlogList',
  components: {
    MyPublishedCard
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

<style>
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
.pagination-container {
  margin-top: 5em;
  margin-bottom: 5em;
}
</style>
