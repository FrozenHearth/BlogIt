<template>
  <v-content>
    <div class="card-list-container" v-if="activePath === '/blogs'">
      <h1 class="card-list-container-title text-center">Latest Posts</h1>
      <div class="empty-list-msg text-center" v-if="blogs.length === 0">
        No blogs found.
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
      <h1 class="card-list-container-title text-center">My Published</h1>
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
      <h1 class="card-list-container-title text-center">My Drafts</h1>
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
import { bus } from '../../main';

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
          this.blogs = res.data.results
            .filter(el => el.published === true)
            .sort((a, b) => a.id - b.id)
            .reverse();
          bus.$emit('blogList', this.blogs);
          this.tag_details = res.data.results.map(el => el.tag_details);
          // Get tags for displayed blogs, and then flatten the result
          const allTags = [].concat(
            ...this.tag_details.map(el => el.map(x => x.tag))
          );

          bus.$emit('tagList', allTags);
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
          bus.$emit('publishedBlogs', this.publishedBlogs);

          this.tag_details = res.data.results.map(el => el.tag_details);
          const publishedBlogTags = [].concat(
            ...this.tag_details.map(el => el.map(x => x.tag))
          );
          bus.$emit('publishedBlogTags', publishedBlogTags);
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
          bus.$emit('myDrafts', this.myDrafts);
          this.tag_details = res.data.results.map(el => el.tag_details);
          const myDraftsBlogTags = [].concat(
            ...this.tag_details.map(el => el.map(x => x.tag))
          );
          bus.$emit('myDraftsBlogTags', myDraftsBlogTags);
          this.pageCount = Math.ceil(res.data.count / 6);
          this.count = res.data.count;
        })
        .catch(err => console.log(err));
    },
    pageChange() {
      window.scrollTo(0, 0);
      const { currentPage } = this.pagination;
      if (currentPage > 1 && this.activePath === '/blogs') {
        getNextBlogList((currentPage - 1) * 6).then(res => {
          this.blogs = res.data.results;
          bus.$emit('blogList', this.blogs);
          this.tag_details = res.data.results.map(el => el.tag_details);
          // Get tags for displayed blogs, and then flatten the result
          const allTags = [].concat(
            ...this.tag_details.map(el => el.map(x => x.tag))
          );
          bus.$emit('tagList', allTags);
        });
      } else if (currentPage > 1 && this.activePath === '/myPublished') {
        getNextPublishedBlogsList((currentPage - 1) * 6).then(res => {
          this.publishedBlogs = res.data.results;
          bus.$emit('publishedBlogs', this.publishedBlogs);
          this.tag_details = res.data.results.map(el => el.tag_details);
          // Get tags for displayed blogs, and then flatten the result
          const allTags = [].concat(
            ...this.tag_details.map(el => el.map(x => x.tag))
          );
          bus.$emit('tagList', allTags);
        });
      } else if (currentPage > 1 && this.activePath === '/myDrafts') {
        getNextDraftsList((currentPage - 1) * 6).then(res => {
          this.myDrafts = res.data.results;
          this.tag_details = res.data.results.map(el => el.tag_details);
          bus.$emit('myDrafts', this.myDrafts);
          // Get tags for displayed blogs, and then flatten the result
          const allTags = [].concat(
            ...this.tag_details.map(el => el.map(x => x.tag))
          );
          bus.$emit('tagList', allTags);
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
  },
  watch: {
    blogs() {
      bus.$on('filteredBlogs', filteredBlogs => {
        this.blogs = filteredBlogs;
      });
    },
    publishedBlogs() {
      bus.$on('filteredPublishedBlogs', filteredPublishedBlogs => {
        this.publishedBlogs = filteredPublishedBlogs;
      });
    },
    myDrafts() {
      bus.$on('filteredMyDrafts', filteredMyDrafts => {
        this.myDrafts = filteredMyDrafts;
      });
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
  font-size: 2.2em;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
}
.new-blog-btn {
  position: relative;
  margin: 0 auto;
  display: block;
  top: 1em;
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
