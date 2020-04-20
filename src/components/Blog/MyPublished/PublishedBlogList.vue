<template>
  <v-content>
    <div class="card-list-container">
      <h1 class="card-list-container-title">My Published</h1>
      <v-btn @click="goToNewBlog" class="new-blog-btn" color="success"
        >Create Blog</v-btn
      >
      <CardView :publishedBlogs="publishedBlogs" />
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
import CardView from '../../common/CardView';
import { getMyPublishedBlogs } from '../../../apis/api';
export default {
  name: 'PublishedBlogList',
  components: {
    CardView
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
    getMyPublishedBlogs().then(res => {
      this.publishedBlogs = res.data.results;
      this.pageCount = Math.ceil(res.data.count / 6);
    });
  },
  methods: {
    pageChange(event) {
      console.log(event);
      // if (event > 1) {
      //   axios
      //     .get(
      //       `${
      //         axios.defaults.baseURL
      //       }/blogapp/my-published?limit=6&offset=${event * 6}`
      //     )
      //     .then(res => {
      //       this.publishedBlogs = res.data.results;
      //     });
      // } else {
      //   axios
      //     .get(`${axios.defaults.baseURL}/blogapp/my-published`)
      //     .then(res => {
      //       this.publishedBlogs = res.data.results;
      //     });
      // }
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
  right: 6.5em;
}
.pagination-container {
  margin-top: 5em;
  margin-bottom: 5em;
}
</style>
