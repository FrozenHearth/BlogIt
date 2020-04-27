<template>
  <v-container fluid class="list-card-container">
    <BlogCard v-if="activePath === '/blogs'" :blogs="blogs" />
    <MyPublishedCard
      :publishedBlogs="publishedBlogs"
      v-if="activePath === '/myPublished'"
    />
    <MyDraftsCard v-if="activePath === '/myDrafts'" :myDrafts="myDrafts" />
  </v-container>
</template>

<script>
import BlogCard from './BlogCard';
import MyPublishedCard from './MyPublishedCard';
import MyDraftsCard from './MyDraftsCard';
export default {
  name: 'CardView',
  props: ['blogs', 'publishedBlogs', 'myDrafts'],
  components: {
    BlogCard,
    MyPublishedCard,
    MyDraftsCard
  },
  data() {
    return {
      activePath: '',
      postedOn: Date
    };
  },
  mounted() {
    this.activePath = this.$route.path;
  }
};
</script>

<style lang="scss" scoped>
// Using ::v-deep to apply styles to child components
::v-deep .list-card-container {
  margin: 0 auto;
}
::v-deep .list-card {
  margin: 2em auto 2em auto;
  position: relative;
  left: 2em;
  max-width: 65em;
  display: flex;
  opacity: 0.9;
}
::v-deep .list-card .v-list-item__content {
  padding-left: 2em !important;
}

::v-deep .list-card .v-card__text {
  padding-left: 2.4em !important;
  padding-right: 3.8em !important;
}

::v-deep .blog-title {
  color: rgba(0, 0, 0, 0.84);
  font-weight: 600;
  font-size: 2.2em;
  line-height: 28px;
  margin-top: 0.5em;
  white-space: pre-wrap !important;
}

::v-deep .blog-details-text,
.blog-subtitle {
  margin: -1.5em 0 0 0.2em;
}

::v-deep .blog-details-text {
  color: rgba(0, 0, 0, 0.6);
}

::v-deep .tags-container {
  border-radius: 0 !important;
  color: rgba(0, 0, 0, 0.54);
}
::v-deep .tags-list {
  display: flex;
  margin: -1em 0 1em 2.4em;
  flex-wrap: wrap;
  text-transform: capitalize;
}
::v-deep .main-content-container {
  width: 50em;
}
::v-deep .blog-image-container {
  width: 15em;
}
::v-deep .blog-image {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
::v-deep .card-actions-container {
  margin-top: -2em;
}
::v-deep .list-card-divider {
  margin-left: 4.8em;
  width: 68em;
  margin-top: 1.6em;
}
::v-deep .blog-redirect {
  color: black;
  font-size: 1.6em;
  position: relative;
  bottom: 4em;
  left: -3em;
}
::v-deep .card-text-read-more-link,
.read-more-link {
  text-decoration: none !important;
  position: relative;
  right: 0.1em;
}
::v-deep .card-text-read-more-link {
  color: #000 !important;
}
::v-deep .read-more-link:hover {
  text-decoration: underline !important;
  text-decoration-color: black !important;
}
::v-deep .read-more-btn {
  margin: 0.5em 0 0.5em 2.8em;
  border-radius: 0;
  cursor: pointer;
}
::v-deep .clock-icon {
  margin-right: 0.2em;
}
::v-deep .posted-date-btn {
  margin: 0.5em 0 0.5em 0.8em;
  border-radius: 0;
  background: none !important;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1.4em;
}
</style>
