<template>
  <div class="addCommentWrapper">
    <v-textarea
      solo
      placeholder="Write a response..."
      height="130"
      v-model="text"
    ></v-textarea>
    <v-btn
      @click.prevent="addNewComment"
      class="post-comment-btn"
      color="primary"
      >Post</v-btn
    >
  </div>
</template>

<script>
import { addComment } from '../../apis/api';
export default {
  name: 'AddComment',
  data: () => ({
    text: ''
  }),
  props: ['blogId'],
  methods: {
    addNewComment() {
      const data = {
        text: this.text
      };
      addComment(this.blogId, data)
        .then(() => {
          this.text = '';
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.addCommentWrapper {
  margin: 0 auto 2em auto;
  font-family: 'PT Serif', serif;
  width: 68em;
  display: flex;
  flex-direction: column;
  position: relative;
}
.post-comment-btn {
  font-family: 'Roboto', serif;
  width: 6em;
  align-self: flex-end;
  margin-bottom: 2em;
}
</style>
