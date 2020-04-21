<template>
  <div class="comment-list-wrapper">
    <div
      v-for="comment in allComments"
      :key="comment.id"
      class="comment-list"
      fluid
    >
      <UserInfo
        :initials="comment.user_name"
        :datePosted="comment.updated_date"
      />
      <span class="icon-container">
        <router-link :to="`/${blogId}/comments/${comment.id}`">
          <v-btn text icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </router-link>
        <!-- <v-btn @click="deleteComment(comment.id)" text icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn> -->
      </span>
      <p class="comment-text">
        {{ comment.text }}
      </p>
    </div>
  </div>
</template>

<script>
import UserInfo from '../common/UserInfo';
export default {
  name: 'CommentList',
  props: ['allComments', 'blogId'],
  components: {
    UserInfo
  }
};
</script>

<style lang="scss" scoped>
.comment-list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 68em;
  margin: 0 auto 4em auto;
}
.comment-list {
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  margin: 0 auto;
  position: relative;
  width: 68em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2em 1em 1em 2em;
  margin-bottom: 2em;
  background: #fff;
}
.icon-container {
  position: absolute;
  right: 2em;
  top: 1.9em;
}

.comment-text {
  text-align: justify;
  font-size: 1.6em;
}
</style>
