<template>
  <div class="addCommentWrapper">
    <v-textarea
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
    initials: ''
  }),
  props: ['blogId'],
  mounted() {
    this.initials = localStorage.getItem('username');
  },
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

<style lang="scss">
.addCommentWrapper {
  margin: 0 auto 2em auto;
  font-family: 'PT Serif', serif;
  width: 68em;
  display: flex;
  flex-direction: column;
  position: relative;
}
.v-application--is-ltr
  .v-textarea.v-text-field--enclosed
  .v-text-field__slot
  textarea {
  padding-right: 12px;
  padding-left: 4em;
  padding-top: 0.6em;
  font-size: 1.15em;
  color: rgba(0, 0, 0, 0.54);
  font-weight: 400;
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
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
