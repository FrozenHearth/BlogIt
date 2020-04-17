<template>
  <v-content>
    <div class="card-list-container">
      <h1 class="card-list-container-title">My Published</h1>
      <MyPublishedCard v-bind:publishedBlogs="publishedBlogs" />
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
import MyPublishedCard from './MyPublishedCard';
import axios from 'axios';
export default {
  name: 'PublishedBlogList',
  components: {
    MyPublishedCard
  },

  data() {
    return {
      pagination: {
        current: 1
      },
      publishedBlogs: [],
      nextPage: '',
      previousPage: '',
      pageCount: 0
    };
  },
  created() {
    axios.get(`${axios.defaults.baseURL}/blogapp/my-published`).then(res => {
      console.log(res.data);
      this.publishedBlogs = res.data.results;
      this.pageCount = Math.ceil(res.data.count / 6);
    });
  },
  methods: {
    pageChange(event) {
      if (event > 1) {
        axios
          .get(
            `${
              axios.defaults.baseURL
            }/blogapp/my-published?limit=6&offset=${event * 6}`
          )
          .then(res => {
            this.publishedBlogs = res.data.results;
          });
      } else {
        axios
          .get(`${axios.defaults.baseURL}/blogapp/my-published`)
          .then(res => {
            this.publishedBlogs = res.data.results;
          });
      }
    },
    goToNewBlog() {
      this.$router.push('/addBlog');
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
