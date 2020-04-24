<template>
  <v-container fluid class="list-card-container">
    <template v-if="activePath === '/blogs'">
      <v-card
        max-width="800"
        v-for="blog in blogs"
        :key="blog.id"
        class="list-card"
      >
        <v-img
          v-if="blog.picture_url"
          class="blog-image"
          :src="blog.picture_url"
        >
        </v-img>

        <v-list-item>
          <v-list-item-content>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <router-link class="read-more-link" :to="`/blog/${blog.id}`">
                  <v-list-item-title v-on="on" class="blog-title">{{
                    blog.title.charAt(0).toUpperCase() + blog.title.slice(1)
                  }}</v-list-item-title>
                </router-link>
              </template>
              <span>Read More</span>
            </v-tooltip>
            <v-list-item-subtitle class="blog-subtitle"
              >by
              {{
                blog.author_name.charAt(0).toUpperCase() +
                  blog.author_name.slice(1)
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          {{ blog.details | truncate(200) }}
          <router-link
            class="card-text-read-more-link"
            :to="`/blog/${blog.id}`"
          >
            <span> ...read more </span>
          </router-link>
        </v-card-text>

        <div class="tags-list">
          <v-chip
            v-for="(blog, index) in blog.tag_details"
            :key="index"
            outlined
            class="tags-container ma-2"
          >
            {{ blog.tag }}
          </v-chip>
        </div>

        <!-- <v-divider class="list-card-divider"></v-divider> -->

        <v-card-actions>
          <v-chip class="posted-date-btn">
            <v-icon class="clock-icon"> mdi-clock-outline</v-icon>

            {{ moment(blog.pub_date).fromNow() }}
          </v-chip>
        </v-card-actions>
      </v-card>
    </template>

    <template v-if="activePath === '/myPublished'">
      <v-card
        v-for="blog in publishedBlogs"
        :key="blog.id"
        max-width="800"
        class="list-card"
      >
        <v-img
          v-if="blog.picture_url"
          class="blog-image"
          :src="blog.picture_url"
        ></v-img>

        <v-list-item>
          <v-list-item-content>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <router-link
                  class="read-more-link"
                  :to="`/myPublished/${blog.id}`"
                >
                  <v-list-item-title v-on="on" class="blog-title">{{
                    blog.title.charAt(0).toUpperCase() + blog.title.slice(1)
                  }}</v-list-item-title>
                </router-link>
              </template>
              <span>Read More</span>
            </v-tooltip>

            <v-list-item-subtitle
              >by
              {{
                blog.author_name.charAt(0).toUpperCase() +
                  blog.author_name.slice(1)
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          {{ blog.details | truncate(200) }}
          <router-link
            class="card-textread-more-link"
            :to="`/myPublished/${blog.id}`"
          >
            <span>...read more </span>
          </router-link>
        </v-card-text>

        <div class="tags-list">
          <v-chip
            v-for="(blog, index) in blog.tag_details"
            :key="index"
            outlined
            class="tags-container ma-2"
          >
            {{ blog.tag }}
          </v-chip>
        </div>

        <v-divider class="list-card-divider"></v-divider>

        <v-card-actions>
          <v-chip outlined class="posted-date-btn">
            {{ moment(blog.pub_date).fromNow() }}
          </v-chip>
        </v-card-actions>
      </v-card>
    </template>

    <!-- My Drafts List -->

    <template v-if="activePath === '/myDrafts'">
      <v-card
        v-for="draft in myDrafts"
        :key="draft.id"
        max-width="800"
        class="list-card"
      >
        <v-img
          v-if="draft.picture_url"
          class="blog-image"
          :src="draft.picture_url"
        ></v-img>

        <v-list-item>
          <v-list-item-content>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <router-link
                  class="read-more-link"
                  :to="`/myDrafts/${draft.id}`"
                >
                  <v-list-item-title v-on="on" class="blog-title">{{
                    draft.title.charAt(0).toUpperCase() + draft.title.slice(1)
                  }}</v-list-item-title>
                </router-link>
              </template>
              <span>Read More</span>
            </v-tooltip>

            <v-list-item-subtitle
              >by
              {{
                draft.author_name.charAt(0).toUpperCase() +
                  draft.author_name.slice(1)
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          {{ draft.details | truncate(200) }}
          <router-link
            class="card-textread-more-link"
            :to="`/myDrafts/${blog.id}`"
          >
            <span>...read more </span>
          </router-link>
        </v-card-text>

        <div class="tags-list">
          <v-chip
            v-for="(draft, index) in draft.tag_details"
            :key="index"
            outlined
            class="tags-container ma-2"
          >
            {{ draft.tag }}
          </v-chip>
        </div>

        <v-divider class="list-card-divider"></v-divider>

        <v-card-actions>
          <v-chip outlined class="posted-date-btn">
            {{ moment(draft.pub_date).fromNow() }}
          </v-chip>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import moment from 'moment';
export default {
  name: 'CardView',
  props: ['blogs', 'publishedBlogs', 'myDrafts'],
  data() {
    return {
      activePath: '',
      postedOn: Date
    };
  },
  filters: {
    truncate(value, size) {
      if (!value) return '';
      value = value.toString();
      if (value.length <= size) {
        return value;
      }
      return value.substring(0, size);
    }
  },
  mounted() {
    this.activePath = this.$route.path;
  },
  methods: {
    moment(date) {
      return moment(date);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-card-container {
  position: relative;
  margin: 0 auto;
  top: 2em;
}
.list-card {
  margin: 2em auto 5em auto;
  max-width: 45em;
  position: relative;
  left: 2em;
  opacity: 0.9;
}
.list-card .v-list-item__content {
  padding-left: 4em !important;
  padding-right: 4em !important;
}

.list-card .v-card__text {
  padding-left: 3.8em !important;
  padding-right: 3.8em !important;
}

.blog-title {
  color: rgba(0, 0, 0, 0.84);
  font-weight: 600;
  font-size: 2.2em;
  margin-top: 1em;
  white-space: pre-wrap !important;
}

.blog-subtitle {
  position: relative;
  top: 0.5em;
}

.tags-container {
  border-radius: 0 !important;
  color: rgba(0, 0, 0, 0.54);
}
.tags-list {
  display: flex;
  margin: 0 0 0 4em;
  flex-wrap: wrap;
  text-transform: capitalize;
}
.blog-image {
  width: 100%;
  max-height: 30em;
  height: auto;
}
.list-card-divider {
  margin-left: 4.8em;
  width: 68em;
  margin-top: 1.6em;
}
.blog-redirect {
  color: black;
  font-size: 1.6em;
  position: relative;
  bottom: 4em;
  left: -3em;
}
.card-text-read-more-link,
.read-more-link {
  text-decoration: none !important;
  position: relative;
  right: 0.2em;
}
.read-more-link:hover {
  text-decoration: underline !important;
  text-decoration-color: black !important;
}
.read-more-btn {
  margin: 0.5em 0 0.5em 2.8em;
  border-radius: 0;
  cursor: pointer;
}
.clock-icon {
  margin-right: 0.2em;
}
.posted-date-btn {
  margin: 0.5em 0 0.5em 2.2em;
  border-radius: 0;
  background: none !important;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1.4em;
}
</style>
