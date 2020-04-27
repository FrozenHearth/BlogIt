<template>
  <v-container fluid class="list-card-container">
    <template v-if="activePath === '/blogs'">
      <v-card tile v-for="blog in blogs" :key="blog.id" class="list-card">
        <div class="main-content-container">
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
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="blog-details-text">
            {{ blog.details | truncate(50) }}
            <router-link
              class="card-text-read-more-link"
              :to="`/blog/${blog.id}`"
            >
              <span>...read more </span>
            </router-link>
          </v-card-text>

          <v-card-text class="blog-subtitle"
            >by
            {{
              blog.author_name.charAt(0).toUpperCase() +
                blog.author_name.slice(1)
            }}</v-card-text
          >

          <v-card-actions class="card-actions-container">
            <v-chip class="posted-date-btn">
              <v-icon class="clock-icon"> mdi-clock-outline</v-icon>
              {{ moment(blog.pub_date).format('LL') }}
            </v-chip>
          </v-card-actions>
          <div class="tags-list">
            <v-chip
              v-for="blog in blog.tag_details.slice(0, 4)"
              :key="blog.id"
              outlined
              class="tags-container ma-2"
            >
              {{ blog.tag }}
            </v-chip>
          </div>
        </div>

        <div class="blog-image-container">
          <v-img
            v-if="blog.picture_url"
            class="blog-image"
            :src="blog.picture_url"
          >
          </v-img>
        </div>
      </v-card>
    </template>

    <template v-if="activePath === '/myPublished'">
      <v-card
        tile
        v-for="blog in publishedBlogs"
        :key="blog.id"
        class="list-card"
      >
        <div class="main-content-container">
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
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="blog-details-text">
            {{ blog.details | truncate(50) }}
            <router-link
              class="card-textread-more-link"
              :to="`/myPublished/${blog.id}`"
            >
              <span>...read more </span>
            </router-link>
          </v-card-text>

          <v-card-text class="blog-subtitle"
            >by
            {{
              blog.author_name.charAt(0).toUpperCase() +
                blog.author_name.slice(1)
            }}</v-card-text
          >

          <v-card-actions class="card-actions-container">
            <v-chip class="posted-date-btn">
              <v-icon class="clock-icon">mdi-clock-outline</v-icon>
              {{ moment(blog.pub_date).fromNow() }}
            </v-chip>
          </v-card-actions>
        </div>
        <div class="blog-image-container">
          <v-img
            v-if="blog.picture_url"
            class="blog-image"
            :src="blog.picture_url"
          ></v-img>
        </div>
      </v-card>
    </template>

    <!-- My Drafts List -->

    <template v-if="activePath === '/myDrafts'">
      <v-card tile v-for="blog in myDrafts" :key="blog.id" class="list-card">
        <div class="main-content-container">
          <v-list-item>
            <v-list-item-content>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <router-link
                    class="read-more-link"
                    :to="`/myDrafts/${blog.id}`"
                  >
                    <v-list-item-title v-on="on" class="blog-title">{{
                      blog.title.charAt(0).toUpperCase() + blog.title.slice(1)
                    }}</v-list-item-title>
                  </router-link>
                </template>
                <span>Read More</span>
              </v-tooltip>
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="blog-subtitle"
            >by
            {{
              blog.author_name.charAt(0).toUpperCase() +
                blog.author_name.slice(1)
            }}</v-card-text
          >

          <v-card-text class="blog-details-text">
            {{ blog.details | truncate(50) }}
            <router-link
              class="card-textread-more-link"
              :to="`/myDrafts/${blog.id}`"
            >
              <span>...read more </span>
            </router-link>
          </v-card-text>

          <v-card-actions class="card-actions-container">
            <v-chip class="posted-date-btn">
              <v-icon class="clock-icon">mdi-clock-outline</v-icon>
              {{ moment(blog.pub_date).fromNow() }}
            </v-chip>
          </v-card-actions>
        </div>
        <div class="blog-image-container">
          <v-img
            v-if="blog.picture_url"
            class="blog-image"
            :src="blog.picture_url"
          ></v-img>
        </div>
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
  margin: 0 auto;
}
.list-card {
  margin: 2em auto 2em auto;
  position: relative;
  left: 2em;
  max-width: 65em;
  display: flex;
  opacity: 0.9;
}
.list-card .v-list-item__content {
  padding-left: 2em !important;
}

.list-card .v-card__text {
  padding-left: 2.4em !important;
  padding-right: 3.8em !important;
}

.blog-title {
  color: rgba(0, 0, 0, 0.84);
  font-weight: 600;
  font-size: 2.2em;
  line-height: 28px;
  margin-top: 0.5em;
  white-space: pre-wrap !important;
}

.blog-details-text,
.blog-subtitle {
  margin: -1.5em 0 0 0.2em;
}

.blog-details-text {
  color: rgba(0, 0, 0, 0.6);
}

.tags-container {
  border-radius: 0 !important;
  color: rgba(0, 0, 0, 0.54);
}
.tags-list {
  display: flex;
  margin: -1em 0 1em 2.4em;
  flex-wrap: wrap;
  text-transform: capitalize;
}
.main-content-container {
  width: 50em;
}
.blog-image-container {
  width: 15em;
}
.blog-image {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
.card-actions-container {
  margin-top: -2em;
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
  right: 0.1em;
}
.card-text-read-more-link {
  color: #000 !important;
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
  margin: 0.5em 0 0.5em 0.8em;
  border-radius: 0;
  background: none !important;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1.4em;
}
</style>
