<template>
  <v-content>
    <div class="card-list-container" v-if="activePath === '/blogs'">
      <h1 class="card-list-container-title">Latest Posts</h1>
      <CardView v-if="blogs.length > 0" v-bind:blogs="blogs" />
      <div class="text-center pagination-container">
        <v-pagination
          @input="pageChange"
          v-model="pagination.currentPage"
          :length="pageCount"
          circle
        ></v-pagination>
      </div>
    </div>

    <div class="card-list-container" v-if="activePath === '/myPublished'">
      <h1 class="card-list-container-title">My Published</h1>
      <v-btn @click="goToNewBlog" class="new-blog-btn" color="success"
        >Create Blog</v-btn
      >
      <CardView :publishedBlogs="publishedBlogs" />
      <div class="text-center pagination-container">
        <v-pagination
          @input="pageChange"
          v-model="pagination.currentPage"
          :length="pageCount"
          circle
        ></v-pagination>
      </div>
    </div>
  </v-content>
</template>

<script>
import {
  getBlogList,
  getNextBlogList,
  getNextPublishedBlogsList
} from '../../apis/api';
import { getMyPublishedBlogs } from '../../apis/api';
import CardView from './CardView';

export default {
  name: 'ListView',
  components: {
    CardView
  },

  data() {
    return {
      pagination: {
        currentPage: 1
      },
      blogs: [],
      activePath: '',
      tag_details: [],
      publishedBlogs: [],
      nextPage: '',
      previousPage: '',
      pageCount: 0
    };
  },
  mounted() {
    this.activePath = this.$route.path;
    const { currentPage } = this.pagination;
    if (this.activePath === '/blogs' && currentPage === 1) {
      this.getAllBlogs();
    } else if (this.activePath === '/myPublished' && currentPage === 1) {
      this.getPublishedBlogs();
    }
  },
  methods: {
    getAllBlogs() {
      getBlogList()
        .then(res => {
          this.blogs = res.data.results.sort((a, b) => a.id - b.id).reverse();
          this.tag_details = res.data.tag_details;
          this.pageCount = Math.ceil(res.data.count / 6);
        })
        .catch(err => console.log(err));
    },
    getPublishedBlogs() {
      getMyPublishedBlogs()
        .then(res => {
          this.publishedBlogs = res.data.results
            .sort((a, b) => a.id - b.id)
            .reverse();
          this.pageCount = Math.ceil(res.data.count / 6);
        })
        .catch(err => console.log(err));
    },
    pageChange() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      const { currentPage } = this.pagination;
      if (currentPage > 1 && this.activePath === '/blogs') {
        getNextBlogList((currentPage - 1) * 6).then(res => {
          this.blogs = res.data.results;
          this.tag_details = res.data.tag_details;
        });
      } else if (currentPage > 1 && this.activePath === '/myPublished') {
        getNextPublishedBlogsList((currentPage - 1) * 6).then(res => {
          this.publishedBlogs = res.data.results;
          this.tag_details = res.data.tag_details;
        });
      } else if (currentPage === 1 && this.activePath === '/blogs') {
        this.getAllBlogs();
      } else if (currentPage === 1 && this.activePath === '/myPublished') {
        this.getPublishedBlogs();
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
  left: 30em;
  font-size: 2.2em;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
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
