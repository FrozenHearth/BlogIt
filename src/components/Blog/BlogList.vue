<template>
  <div class="card-list-container">
    <h1 class="card-list-container-title">Latest Posts</h1>
    <BlogListCard />
    <div class="text-center pagination-container">
      <v-pagination
        @input="next"
        v-model="page"
        :length="4"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import BlogListCard from './BlogListCard';
export default {
  name: 'BlogList',
  components: {
    BlogListCard
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
  left: 2em;
  font-size: 2.5em;
  font-weight: 400;
}
.pagination-container {
  margin-top: 5em;
  margin-bottom: 5em;
}
</style>
