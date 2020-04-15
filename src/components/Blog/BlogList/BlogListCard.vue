<template>
  <v-container fluid class="card-container">
    <v-card v-for="blog in blogs" :key="blog.id" class="card">
      <v-list-item>
        <v-list-item-avatar
          color="primary"
          min-width="36"
          width="36"
          height="36"
        >
          <span id="author-initials" class="white--text headline ">{{
            blog.author_name.charAt(0).toUpperCase()
          }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{
            blog.title
          }}</v-list-item-title>
          <v-list-item-subtitle
            >by
            {{
              blog.author_name.charAt(0).toUpperCase() +
                blog.author_name.slice(1)
            }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-img
        v-if="blog.picture_url"
        class="blog-image"
        :src="blog.picture_url"
      ></v-img>

      <v-card-text>
        {{ blog.details }}
      </v-card-text>

      <v-card-actions>
        <router-link class="read-more-link" :to="`/blog/${blog.id}`">
          <v-btn class="read-more-btn" text color="deep-purple accent-4">
            Read More
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'BlogListCard',
  props: ['blogs']
};
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: 5em;
}
.card {
  margin: 2em 5em 5em 5em;
  max-width: 35em;
  position: relative;
  left: 2em;
  opacity: 0.9;
}
.blog-image {
  width: 100%;
  height: 25em;
  filter: brightness(80%);
}
.blog-short-desc {
  color: white;
  font-size: 1.6em;
  position: relative;
  bottom: 4em;
  left: -1em;
  font-weight: 800;
}
.blog-redirect {
  color: black;
  font-size: 1.6em;
  position: relative;
  bottom: 4em;
  left: -3em;
}
.read-more-link {
  text-decoration: none;
}
.read-more-btn {
  margin: 0 auto;
}
</style>
