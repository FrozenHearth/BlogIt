<template>
  <v-content>
    <div class="card-list-container" v-if="activePath === '/blogs'">
      <h1 class="card-list-container-title">Latest Posts</h1>
      <div class="empty-list-msg text-center" v-if="blogs.length === 0">
        No one has created any blogs.
      </div>
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
      <div
        class="empty-list-msg text-center"
        v-if="publishedBlogs.length === 0"
      >
        No Blogs Published.
      </div>
      <v-btn icon @click="goToNewBlog" class="new-blog-btn"
        ><v-icon> mdi-plus-circle-outline</v-icon></v-btn
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

    <div class="card-list-container" v-if="activePath === '/myDrafts'">
      <h1 class="card-list-container-title">My Drafts</h1>
      <div class="empty-list-msg text-center" v-if="myDrafts.length === 0">
        No Drafts created.
      </div>
      <v-btn icon @click="goToNewBlog" class="new-blog-btn"
        ><v-icon> mdi-plus-circle-outline</v-icon></v-btn
      >

      <CardView :myDrafts="myDrafts" />
      <div v-if="count > 6" class="text-center pagination-container">
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
  getNextPublishedBlogsList,
  getMyDrafts,
  getNextDraftsList
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
      myDrafts: [],
      count: 0,
      nextPage: '',
      previousPage: '',
      pageCount: 0
    };
  },
  mounted() {
    this.activePath = this.$route.path;
    if (this.activePath === '/blogs') {
      this.getAllBlogs();
    } else if (this.activePath === '/myPublished') {
      this.getPublishedBlogs();
    } else if (this.activePath === '/myDrafts') {
      this.getAllDrafts();
    }
  },
  methods: {
    getAllBlogs() {
      getBlogList()
        .then(res => {
          this.blogs = res.data.results.sort((a, b) => a.id - b.id).reverse();
          this.tag_details = res.data.tag_details;
          this.pageCount = Math.ceil(res.data.count / 6);
          this.count = res.data.count;
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
          this.count = res.data.count;
        })
        .catch(err => console.log(err));
    },
    getAllDrafts() {
      getMyDrafts()
        .then(res => {
          this.myDrafts = res.data.results
            .sort((a, b) => a.id - b.id)
            .reverse();
          this.pageCount = Math.ceil(res.data.count / 6);
          this.count = res.data.count;
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
      } else if (currentPage > 1 && this.activePath === '/myDrafts') {
        getNextDraftsList((currentPage - 1) * 6).then(res => {
          this.myDrafts = res.data.results;
          this.tag_details = res.data.tag_details;
        });
      } else if (
        this.count > 6 &&
        currentPage === 1 &&
        this.activePath === '/blogs'
      ) {
        this.getAllBlogs();
      } else if (
        this.count > 6 &&
        currentPage === 1 &&
        this.activePath === '/myPublished'
      ) {
        this.getPublishedBlogs();
      } else if (
        this.count > 6 &&
        currentPage === 1 &&
        this.activePath === '/myDrafts'
      ) {
        this.getAllDrafts();
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
  font-size: 2.2em;
  left: 30em;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
}
.new-blog-btn {
  position: relative;
  margin: 0 auto;
  display: block;
  top: 3em;
}
.pagination-container {
  margin-top: 5em;
  margin-bottom: 5em;
}
.empty-list-msg {
  font-size: 1.5em;
  position: relative;
  top: 2.5em;
}
</style>
