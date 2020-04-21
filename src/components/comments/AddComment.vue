<template>
  <div class="addCommentWrapper">
    <v-textarea
      solo
      placeholder="Write a response..."
      height="130"
      v-model="text"
    ></v-textarea>
    <v-btn @click.prevent="addComment" class="post-comment-btn" color="primary"
      >Post</v-btn
    >
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddComment',
  data: () => ({
    text: ''
  }),
  props: ['blogId'],
  methods: {
    addComment() {
      axios
        .post(
          `${axios.defaults.baseURL}/blogapp/blogs/${this.blogId}/comments`,
          {
            text: this.text
          }
        )
        .then(() => {
          this.text = '';
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.addCommentWrapper {
  margin: 0 auto 2em auto;
  width: 68em;
  display: flex;
  flex-direction: column;
  position: relative;
}
.post-comment-btn {
  width: 6em;
  align-self: flex-end;
  margin-bottom: 2em;
}
</style>
