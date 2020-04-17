<template>
  <v-content>
    <div class="card-list-container">
      <h1 class="card-list-container-title">Latest Posts</h1>
      <BlogListCard v-if="blogs.length > 0" v-bind:blogs="blogs" />
      <div class="text-center pagination-container">
        <v-pagination
          @input="pageChange"
          v-model="pagination.current"
          :length="pageCount"
          circle
        ></v-pagination>
      </div>
    </div>
  </v-content>
</template>

<script>
import axios from 'axios';
import BlogListCard from './BlogListCard';

export default {
  name: 'BlogList',
  components: {
    BlogListCard
  },

  data() {
    return {
      pagination: {
        current: 1
      },
      blogs: [],
      nextPage: '',
      previousPage: '',
      pageCount: 0
    };
  },
  created() {
    axios.get(`${axios.defaults.baseURL}/blogapp/blogs`).then(res => {
      this.blogs = res.data.results;
      this.pageCount = Math.ceil(res.data.count / 6);
    });
  },
  methods: {
    pageChange(event) {
      if (event > 1) {
        axios
          .get(
            `${axios.defaults.baseURL}/blogapp/blogs?limit=6&offset=${event *
              6}`
          )
          .then(res => {
            this.blogs = res.data.results;
            // this.pageCount = Math.ceil(res.data.count / 6);
          });
      } else {
        axios.get(`${axios.defaults.baseURL}/blogapp/blogs`).then(res => {
          this.blogs = res.data.results;
          // this.pageCount = Math.ceil(res.data.count / 6);
        });
      }
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
