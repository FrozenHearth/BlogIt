<template>
  <div>
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
            blog.author_name.charAt(0).toUpperCase() + blog.author_name.slice(1)
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
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'BlogCard',
  props: ['blogs'],
  methods: {
    moment(date) {
      return moment(date);
    }
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
  }
};
</script>

<style lang="scss" scoped></style>
