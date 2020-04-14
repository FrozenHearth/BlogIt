<template>
  <v-container fluid class="card-container">
    <v-card v-for="n in 6" :key="n" class="card">
      <!-- Repeat the card 6 times. Later will be replaced by dynamic rendering -->
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Blog Title</v-list-item-title>
          <v-list-item-subtitle>by Vishwanath</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img
        class="blog-image"
        src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      ></v-img>

      <v-card-text>
        This is the blog description. 50 characters.
      </v-card-text>

      <v-card-actions>
        <v-btn
          v-on:click="redirect"
          class="read-more-btn"
          text
          color="deep-purple accent-4"
        >
          Read More
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'MyDraftsCard',
  methods: {
    redirect() {
      this.$router.push('/myDrafts/123');
      // 123 will be replaced with blog id generated from the backend
    }
  }
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
.read-more-btn {
  margin: 0 auto;
}
</style>
