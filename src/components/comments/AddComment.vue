<template>
  <div class="addCommentWrapper">
    <v-textarea
      solo
      placeholder="Write a response..."
      height="130"
    ></v-textarea>
    <v-btn class="post-comment-btn" color="primary">Post</v-btn>
  </div>
</template>

<script>
export default {
  name: 'AddComment',
  data: () => ({
    expandCommentBox: false
  }),
  methods: {
    expand() {
      this.expandCommentBox = !this.expandCommentBox;
    }
  }
};
</script>

<style lang="scss" scoped>
.addCommentWrapper {
  margin: 0 auto 2em auto;
  width: 60em;
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
