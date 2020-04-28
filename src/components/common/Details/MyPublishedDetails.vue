<template>
  <div class="details-container">
    <div class="title-container">
      <h2 class="blog-header">
        {{ blog.blogTitle }}
      </h2>
    </div>
    <div class="author-details-wrapper">
      <UserInfo :initials="blog.authorName" :datePosted="blog.publishedDate" />
      <router-link
        class="edit-link"
        :to="{
          name: 'CreateBlog',
          params: { id: `${blogId}` },
          query: {
            prevComponent: activeComponent
          }
        }"
      >
        <v-btn text icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </router-link>
    </div>

    <div class="image-container">
      <img class="blog-details-image" :src="blog.image" alt="" />
    </div>

    <div class="description-container">
      <p class="short-description">
        {{
          blog.blogDetails.charAt(0).toUpperCase() + blog.blogDetails.slice(1)
        }}
      </p>
    </div>
    <div class="tag-chips-container">
      <v-chip
        ripple
        label
        v-for="tagName of blog.blogTags"
        :key="tagName.id"
        class="tag-description ma-2"
      >
        {{ tagName.tag.charAt(0).toUpperCase() + tagName.tag.slice(1) }}
      </v-chip>
    </div>
    <v-divider class="blog-details-divider"></v-divider>
    <footer class="blog-details-footer-wrapper">
      <div class="blog-details-footer-container">
        <v-avatar width="80" height="80" class="user-avatar-footer" default>
          <span id="user-initials-footer" class="white--text headline ">{{
            blog.authorName
              ? blog.authorName.substring(0, 2).toUpperCase()
              : 'N/A'
          }}</span>
        </v-avatar>
        <div class="author-details-footer">
          <p class="author-details-title">WRITTEN BY</p>
          <h2 class="author-name">
            You
          </h2>
        </div>
      </div>
    </footer>
    <v-divider class="blog-details-divider-second"></v-divider>
    <div class="responses-container" @click="toggleComments">
      <p
        v-if="blog.commentsList.length > 0 && showComments === false"
        class="text-center response-content-msg"
      >
        See responses ({{ blog.commentsList.length }})
      </p>
      <p
        v-if="blog.commentsList.length > 0 && showComments === true"
        class="text-center response-content-msg"
      >
        Hide responses ({{ blog.commentsList.length }})
      </p>
      <p
        v-if="blog.commentsList.length === 0"
        class="text-center response-content-msg"
      >
        Write the first response
      </p>
    </div>
  </div>
</template>

<script>
import UserInfo from '../../common/UserInfo';
export default {
  name: 'MyPublishedDetails',
  props: ['blog', 'blogId', 'activeComponent', 'showComments', 'isOwner'],
  components: {
    UserInfo
  },
  methods: {
    toggleComments() {
      this.$emit('toggle');
    }
  }
};
</script>

<style></style>
