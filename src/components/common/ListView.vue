<template>
  <v-content>
    <div class="card-list-container" v-if="activePath === '/blogs'">
      <h1 class="card-list-container-title text-center">
        Latest Posts
        <v-icon class="latest-posts-icon">mdi-calendar-text</v-icon>
      </h1>
      <CardListLoader
        :isLoadingBlogs="isLoadingBlogs"
        :searchingBlogs="searchingBlogs"
        :blogSearchResultLength="blogSearchResultLength"
        :blogsLength="blogsLength"
      />
      <CardContainer v-if="isLoadingBlogs === false" :blogs="blogs" />
      <div
        v-if="isLoadingBlogs === false && blogSearchResultLength !== 0"
        class="text-center pagination-container"
      >
        <v-pagination
          @input="pageChange"
          v-model="pagination.currentPage"
          :length="pageCount"
          circle
        ></v-pagination>
      </div>
    </div>

    <div class="card-list-container" v-if="activePath === '/myPublished'">
      <h1 class="card-list-container-title text-center">
        My Published <v-icon class="published-icon">mdi-marker-check</v-icon>
      </h1>
      <v-btn icon @click="goToNewBlog" class="new-blog-btn"
        ><v-icon class="new-blog-icon"> mdi-plus-box-outline</v-icon></v-btn
      >
      <CardListLoader
        :isLoadingBlogs="isLoadingBlogs"
        :searchingBlogs="searchingBlogs"
        :blogSearchResultLength="blogSearchResultLength"
        :blogsLength="blogsLength"
      />
      <CardContainer
        v-if="isLoadingBlogs === false"
        :publishedBlogs="publishedBlogs"
      />
      <div
        v-if="isLoadingBlogs === false && blogSearchResultLength !== 0"
        class="text-center pagination-container"
      >
        <v-pagination
          @input="pageChange"
          v-model="pagination.currentPage"
          :length="pageCount"
          circle
        ></v-pagination>
      </div>
    </div>

    <div class="card-list-container" v-if="activePath === '/myDrafts'">
      <h1 class="card-list-container-title text-center">
        My Drafts
        <v-icon class="drafts-icon">mdi-file-edit</v-icon>
      </h1>
      <v-btn icon @click="goToNewBlog" class="new-blog-btn"
        ><v-icon> mdi-plus-box-outline</v-icon></v-btn
      >
      <CardListLoader
        :isLoadingBlogs="isLoadingBlogs"
        :searchingBlogs="searchingBlogs"
        :blogSearchResultLength="blogSearchResultLength"
        :blogsLength="blogsLength"
      />
      <CardContainer v-if="isLoadingBlogs === false" :myDrafts="myDrafts" />
      <div
        v-if="
          isLoadingBlogs === false && count > 6 && blogSearchResultLength !== 0
        "
        class="text-center pagination-container"
      >
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
import CardContainer from './Cards/CardContainer';
import CardListLoader from './Loaders/CardListLoader';
import { bus } from '../../main';

export default {
  name: 'ListView',
  components: {
    CardContainer,
    CardListLoader
  },

  data() {
    return {
      pagination: {
        currentPage: 1
      },
      blogs: [],
      blogsLength: 0,
      isLoadingBlogs: true,
      searchingBlogs: null,
      noBlogsFound: null,
      blogSearchResultLength: null,
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
      this.isLoadingBlogs = true;
      getBlogList()
        .then(res => {
          this.blogs = res.data.results
            .filter(el => el.published === true)
            .sort((a, b) => a.id - b.id)
            .reverse();
          this.blogsLength = this.blogs.length;
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
        .then(() => {
          setTimeout(() => {
            this.isLoadingBlogs = false;
          }, 1000);
        })
        .catch(err => console.log(err));
    },
    getPublishedBlogs() {
      this.isLoadingBlogs = true;
      getMyPublishedBlogs()
        .then(res => {
          this.publishedBlogs = res.data.results
            .sort((a, b) => a.id - b.id)
            .reverse();
          this.blogsLength = this.publishedBlogs.length;
          bus.$emit('publishedBlogs', this.publishedBlogs);
          this.tag_details = res.data.results.map(el => el.tag_details);
          const publishedBlogTags = [].concat(
            ...this.tag_details.map(el => el.map(x => x.tag))
          );
          bus.$emit('publishedBlogTags', publishedBlogTags);
          this.pageCount = Math.ceil(res.data.count / 6);
          this.count = res.data.count;
        })
        .then(() => {
          setTimeout(() => {
            this.isLoadingBlogs = false;
          }, 1000);
        })
        .catch(err => console.log(err));
    },
    getAllDrafts() {
      this.isLoadingBlogs = true;
      getMyDrafts()
        .then(res => {
          this.myDrafts = res.data.results
            .sort((a, b) => a.id - b.id)
            .reverse();
          this.blogsLength = this.myDrafts.length;
          bus.$emit('myDrafts', this.myDrafts);
          this.tag_details = res.data.results.map(el => el.tag_details);
          const myDraftsBlogTags = [].concat(
            ...this.tag_details.map(el => el.map(x => x.tag))
          );
          bus.$emit('myDraftsBlogTags', myDraftsBlogTags);
          this.pageCount = Math.ceil(res.data.count / 6);
          this.count = res.data.count;
        })
        .then(() => {
          setTimeout(() => {
            this.isLoadingBlogs = false;
          }, 1000);
        })
        .catch(err => console.log(err));
    },
    pageChange() {
      window.scrollTo(0, 0);
      const { currentPage } = this.pagination;
      if (currentPage > 1 && this.activePath === '/blogs') {
        this.isLoadingBlogs = true;
        getNextBlogList((currentPage - 1) * 6)
          .then(res => {
            this.blogs = res.data.results;
            this.blogsLength = this.blogs.length;
            bus.$emit('blogList', this.blogs);
            this.tag_details = res.data.results.map(el => el.tag_details);
            // Get tags for displayed blogs, and then flatten the result
            const allTags = [].concat(
              ...this.tag_details.map(el => el.map(x => x.tag))
            );
            bus.$emit('tagList', allTags);
          })
          .then(() => {
            this.isLoadingBlogs = false;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (currentPage > 1 && this.activePath === '/myPublished') {
        this.isLoadingBlogs = true;
        getNextPublishedBlogsList((currentPage - 1) * 6)
          .then(res => {
            this.publishedBlogs = res.data.results;
            this.blogsLength = this.publishedBlogs.length;
            bus.$emit('publishedBlogs', this.publishedBlogs);
            this.tag_details = res.data.results.map(el => el.tag_details);
            // Get tags for displayed blogs, and then flatten the result
            const allTags = [].concat(
              ...this.tag_details.map(el => el.map(x => x.tag))
            );
            bus.$emit('tagList', allTags);
          })
          .then(() => {
            this.isLoadingBlogs = false;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (currentPage > 1 && this.activePath === '/myDrafts') {
        this.isLoadingBlogs = true;
        getNextDraftsList((currentPage - 1) * 6)
          .then(res => {
            this.myDrafts = res.data.results;
            this.blogsLength = this.myDrafts.length;
            this.tag_details = res.data.results.map(el => el.tag_details);
            bus.$emit('myDrafts', this.myDrafts);
            // Get tags for displayed blogs, and then flatten the result
            const allTags = [].concat(
              ...this.tag_details.map(el => el.map(x => x.tag))
            );
            bus.$emit('tagList', allTags);
          })
          .then(() => {
            this.isLoadingBlogs = false;
          })
          .catch(err => {
            console.log(err);
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
      bus.$on('searchingBlogs', searchingBlogs => {
        this.searchingBlogs = searchingBlogs;
      });
      bus.$on('noBlogsFound', noBlogsFound => {
        this.noBlogsFound = noBlogsFound;
      });
      bus.$on('blogSearchResultLength', blogSearchResultLength => {
        this.blogSearchResultLength = blogSearchResultLength;
        console.log(this.blogSearchResultLength);
      });
    },
    publishedBlogs() {
      bus.$on('filteredPublishedBlogs', filteredPublishedBlogs => {
        this.publishedBlogs = filteredPublishedBlogs;
      });
      bus.$on('searchingBlogs', searchingBlogs => {
        this.searchingBlogs = searchingBlogs;
      });
      bus.$on('noBlogsFound', noBlogsFound => {
        this.noBlogsFound = noBlogsFound;
      });
      bus.$on('blogSearchResultLength', blogSearchResultLength => {
        this.blogSearchResultLength = blogSearchResultLength;
      });
    },
    myDrafts() {
      bus.$on('filteredMyDrafts', filteredMyDrafts => {
        this.myDrafts = filteredMyDrafts;
      });
      bus.$on('searchingBlogs', searchingBlogs => {
        this.searchingBlogs = searchingBlogs;
      });
      bus.$on('noBlogsFound', noBlogsFound => {
        this.noBlogsFound = noBlogsFound;
      });
      bus.$on('blogSearchResultLength', blogSearchResultLength => {
        this.blogSearchResultLength = blogSearchResultLength;
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
.latest-posts-icon {
  color: #3ca8e8;
  position: relative;
  bottom: 0.05em;
  left: 0.15em;
}
.published-icon {
  color: #4ca97c;
  position: relative;
  bottom: 0.05em;
  left: 0.15em;
}
.drafts-icon {
  color: #ff5252;
  position: relative;
  bottom: 0.05em;
  left: 0.15em;
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
