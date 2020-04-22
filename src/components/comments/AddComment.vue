<template>
  <div class="addCommentWrapper">
    <v-textarea
      class="add-comment-textarea"
      solo
      placeholder="Write a response..."
      v-model="text"
    ></v-textarea>
    <v-avatar
      width="36"
      height="36"
      min-width="36"
      class="user-avatar-add-comment"
      default
      color="primary"
    >
      <span id="user-initials-comment-avatar" class="white--text headline ">{{
        initials ? initials.substring(0, 2).toUpperCase() : 'N/A'
      }}</span>
    </v-avatar>
    <v-btn outlined @click.prevent="addNewComment" class="post-comment-btn"
      >Publish</v-btn
    >
  </div>
</template>

<script>
import { addComment } from '../../apis/api';
export default {
  name: 'AddComment',
  data: () => ({
    text: '',
    initials: '',
    addedComment: {}
  }),
  props: ['blogId', 'allComments'],
  mounted() {
    this.initials = localStorage.getItem('username');
  },
  methods: {
    addNewComment() {
      const data = {
        text: this.text
      };
      addComment(this.blogId, data)
        .then(res => {
          this.text = '';
          this.addedComment = res.data;
          this.$emit('updated', this.addedComment);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss">
.addCommentWrapper {
  margin: 0 auto 2em auto;
  font-family: 'PT Serif', serif;
  width: 68em;
  display: flex;
  flex-direction: column;
  position: relative;
}
.add-comment-textarea textarea {
  padding-right: 12px !important;
  padding-left: 4em !important;
  padding-top: 0.6em !important;
  font-size: 1.15em !important;
  color: rgba(0, 0, 0, 0.54) !important;
  font-weight: 400 !important;
}
.add-comment-textarea .v-input__slot {
  border: 1px solid rgba(0, 0, 0, 0.09) !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
  height: 5em;
}
#user-initials-comment-avatar {
  font-size: 1em !important;
}
.user-avatar-add-comment {
  position: absolute;
  top: 2em;
  left: 3em;
}
.post-comment-btn {
  font-family: 'Roboto', serif;
  width: 6em;
  align-self: flex-end;
  margin-bottom: 2em;
  border: 1px solid rgba(3, 168, 124, 1);
  background: none !important;
  text-transform: capitalize;
  color: #029e74 !important;
  font-size: 1.4em;
  font-weight: 400;
}
</style>
