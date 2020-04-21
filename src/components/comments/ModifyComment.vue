<template>
  <v-content>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="commentUpdated === true"
      type="success"
    >
      Comment successfully updated!
    </v-alert>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="commentUpdated === false"
      type="error"
    >
      Failed to update comment!
    </v-alert>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="commentDeleted === true"
      type="success"
    >
      Comment successfully deleted!
    </v-alert>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="commentDeleted === false"
      type="error"
    >
      Failed to deleted comment!
    </v-alert>
    <div class="modifyCommentsWrapper">
      <h2 class="title">Edit Comment</h2>
      <v-textarea
        solo
        placeholder="Edit your response..."
        height="130"
        v-model="text"
      ></v-textarea>
      <div class="btn-container">
        <v-btn
          @click.prevent="onUpdateComment"
          class="update-comment-btn"
          color="success"
          >Update</v-btn
        >
        <v-btn
          @click.prevent="onDeleteComment"
          class="delete-comment-btn"
          color="error"
          >Delete</v-btn
        >
      </div>
    </div>
  </v-content>
</template>

<script>
import {
  updateComment,
  getCommentDetails,
  deleteComment
} from '../../apis/api';
export default {
  name: 'ModifyComment',
  data: () => ({
    text: '',
    commentUpdated: null,
    commentDeleted: null
  }),
  mounted() {
    const { id, commentId } = this.$route.params;
    getCommentDetails(id, commentId)
      .then(res => {
        const { text } = res.data;
        this.text = text;
      })
      .catch(err => console.log(err));
  },
  methods: {
    onUpdateComment() {
      const { id, commentId } = this.$route.params;
      if (this.text !== '') {
        const data = {
          text: this.text
        };
        updateComment(id, commentId, data)
          .then(() => {
            this.commentUpdated = true;
            this.text = '';
            setTimeout(() => {
              this.$router.push(`/myPublished/${id}`);
            }, 1000);
          })
          .catch(err => {
            console.log(err);
            this.commentUpdated = false;
          });
      }
    },
    onDeleteComment() {
      const { id, commentId } = this.$route.params;
      deleteComment(id, commentId)
        .then(() => {
          this.commentDeleted = true;
          setTimeout(() => {
            this.$router.push(`/myPublished/${id}`);
          }, 1000);
        })
        .catch(err => {
          console.log(err);
          this.commentDeleted = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.modifyCommentsWrapper {
  margin: 12em auto 2em auto;
  width: 60em;
  display: flex;
  flex-direction: column;
  position: relative;
}
.alert-banner {
  position: absolute;
  top: 5em;
  right: 2em;
}
.title {
  display: flex;
  margin-bottom: 1.5em;
}
.btn-container {
  display: flex;
}
.update-comment-btn {
  margin-right: 1.5em;
}
.update-comment-btn,
.delete-comment-btn {
  width: 6em;
  align-self: flex-end;
  margin-bottom: 2em;
}
</style>
