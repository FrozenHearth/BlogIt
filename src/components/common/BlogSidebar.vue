<template>
  <v-navigation-drawer
    width="300"
    class="side-nav-drawer"
    v-model="toggleDrawer"
    app
    fixed
    right
  >
    <v-list dense>
      <v-list-item v-if="activePath === '/blogs'" class="side-nav-items">
        <v-icon class="search-icon">mdi-magnify</v-icon>
        <v-text-field
          v-model="searchTerm"
          @keyup="searchBlogs"
          type="text"
          label="Search Blogs"
          solo
        >
        </v-text-field>
      </v-list-item>
      <v-list-item v-if="activePath === '/myPublished'" class="side-nav-items">
        <v-icon class="search-icon">mdi-magnify</v-icon>
        <v-text-field
          v-model="searchTermPublished"
          @keyup="searchPublishedBlogs"
          type="text"
          label="Search"
          solo
        >
        </v-text-field>
      </v-list-item>
      <v-list-item v-if="activePath === '/myDrafts'" class="side-nav-items">
        <v-icon class="search-icon">mdi-magnify</v-icon>
        <v-text-field
          v-model="searchTermDrafts"
          @keyup="searchMyDrafts"
          type="text"
          label="Search"
          solo
        >
        </v-text-field>
      </v-list-item>

      <v-list-item>
        <div class="tags-list">
          <v-chip
            v-for="(tag, index) in tags.slice(0, 10)"
            :key="index"
            outlined
            class="tags-container ma-2"
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { bus } from '../../main';
import _ from 'lodash';
export default {
  props: ['source', 'toggleDrawer'],
  data() {
    return {
      drawer: this.toggleDrawer,
      isClosed: false,
      tags: [],
      searchTerm: '',
      searchTermPublished: '',
      searchTermDrafts: '',
      blogs: [],
      publishedBlogs: [],
      filteredBlogs: [],
      filteredMyDrafts: [],
      filteredPublishedBlogs: [],
      myDrafts: [],
      activePath: ''
    };
  },

  methods: {
    searchBlogs: _.debounce(function() {
      if (this.searchTerm !== '' && this.blogs.length > 0) {
        const result = this.blogs.filter(blog =>
          blog.title.toLowerCase().match(this.searchTerm.toLowerCase())
        );
        this.filteredBlogs = result;
        // Return search results
      } else if (this.searchTerm === '') {
        this.filteredBlogs = this.blogs;
        // If search term is empty or is resetted, then return the original list
      }
      bus.$emit('filteredBlogs', this.filteredBlogs);
    }, 2000),
    searchPublishedBlogs: _.debounce(function() {
      if (this.searchTermPublished !== '' && this.publishedBlogs.length > 0) {
        const result = this.publishedBlogs.filter(blog =>
          blog.title.toLowerCase().match(this.searchTermPublished.toLowerCase())
        );
        this.filteredPublishedBlogs = result;
      } else if (this.searchTerm === '') {
        this.filteredPublishedBlogs = this.publishedBlogs;
      }
      bus.$emit('filteredPublishedBlogs', this.filteredPublishedBlogs);
    }, 2000),
    searchMyDrafts: _.debounce(function() {
      if (this.searchTermDrafts !== '' && this.myDrafts.length > 0) {
        const result = this.myDrafts.filter(blog =>
          blog.title.toLowerCase().match(this.searchTermDrafts.toLowerCase())
        );
        this.filteredMyDrafts = result;
      } else if (this.searchTerm === '') {
        this.filteredMyDrafts = this.myDrafts;
      }
      bus.$emit('filteredMyDrafts', this.filteredMyDrafts);
    }, 2000)
  },
  mounted() {
    const { path } = this.$route;
    const { id } = this.$route.params;
    this.activePath = path;

    if (this.activePath === '/blogs') {
      bus.$on('tagList', tags => {
        this.tags = tags;
      });
      bus.$on('blogList', blogList => {
        this.blogs = blogList;
      });
    } else if (this.activePath === '/myPublished') {
      bus.$on('publishedBlogTags', tags => {
        this.tags = tags;
      });
      bus.$on('publishedBlogs', publishedBlogs => {
        this.publishedBlogs = publishedBlogs;
      });
    } else if (this.activePath === '/myDrafts') {
      bus.$on('myDraftsBlogTags', tags => {
        this.tags = tags;
      });
      bus.$on('myDrafts', myDrafts => {
        this.myDrafts = myDrafts;
      });
    } else if (
      this.activePath === `/blog/${id}` ||
      this.activePath === `/myPublished/${id}` ||
      this.activePath === `/myDrafts/${id}`
    ) {
      bus.$on('detailsTagList', tags => {
        this.tags = tags;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.side-nav-drawer {
  top: 6.5em !important;
}
.side-nav-items {
  position: relative;
  margin-top: 5em;
}
.search-icon {
  position: absolute;
  bottom: 1.7em;
  right: 1em;
  z-index: 10;
}
.tags-container {
  border-radius: 0 !important;
  color: rgba(0, 0, 0, 0.54);
}
.tags-list {
  display: flex;
  flex-wrap: wrap;
  text-transform: capitalize;
}
</style>
