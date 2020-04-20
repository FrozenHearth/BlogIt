<template>
  <v-content>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="commentUpdated === true"
      :style="{ position: 'absolute', top: '5em', right: '2em' }"
      type="success"
    >
      Comment successfully updated!
    </v-alert>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="commentUpdated === false"
      :style="{ position: 'absolute', top: '5em', right: '2em' }"
      type="error"
    >
      Failed to update comment!
    </v-alert>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="commentDeleted === true"
      :style="{ position: 'absolute', top: '5em', right: '2em' }"
      type="success"
    >
      Comment successfully deleted!
    </v-alert>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="commentDeleted === false"
      :style="{ position: 'absolute', top: '5em', right: '2em' }"
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
          @click.prevent="updateComment"
          class="update-comment-btn"
          color="success"
          >Update</v-btn
        >
        <v-btn
          @click.prevent="deleteComment"
          class="delete-comment-btn"
          color="error"
          >Delete</v-btn
        >
      </div>
    </div>
  </v-content>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ModifyComment',
  data: () => ({
    text: '',
    commentUpdated: null,
    commentDeleted: null
  }),
  mounted() {
    const { id, commentId } = this.$route.params;
    axios
      .get(
        `${axios.defaults.baseURL}/blogapp/blogs/${id}/comments/${commentId}`
      )
      .then(res => {
        const { text } = res.data;
        this.text = text;
      });
  },
  methods: {
    updateComment() {
      const { id, commentId } = this.$route.params;
      if (this.text !== '') {
        axios
          .put(
            `${axios.defaults.baseURL}/blogapp/blogs/${id}/comments/${commentId}`,
            {
              text: this.text
            }
          )
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
    deleteComment() {
      const { id, commentId } = this.$route.params;

      axios
        .delete(
          `${axios.defaults.baseURL}/blogapp/blogs/${id}/comments/${commentId}`
        )
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
