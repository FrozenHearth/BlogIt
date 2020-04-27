<template>
  <v-content>
    <!-- My Blog Details  -->

    <v-container v-if="activeComponent === 'BlogDetails'">
      <DetailsContainerLoader :isLoadingBlogs="isLoadingBlogs" />
      <BlogDetails
        v-if="isLoadingBlogs === false"
        :blogId="blogId"
        :blog="blog"
        :showComments="showComments"
        @toggle="toggleCommentSection"
        :isOwner="isOwner"
        :activeComponent="activeComponent"
      />
      <div v-if="showComments">
        <div class="comment-header-container">
          <h3 class="comment-header">Comments</h3>
        </div>
        <AddComment v-on:updated="updatedComment" :blogId="blogId" />
        <CommentList
          :isOwner="isOwner"
          :blogId="blogId"
          :allComments="blog.commentsList"
        />
      </div>
    </v-container>

    <!-- My Published Details  -->

    <v-container
      v-if="isOwner === true && activeComponent === 'PublishedDetails'"
    >
      <DetailsContainerLoader :isLoadingBlogs="isLoadingBlogs" />
      <MyPublishedDetails
        v-if="isLoadingBlogs === false"
        :isOwner="isOwner"
        :blogId="blogId"
        :blog="blog"
        @toggle="toggleCommentSection"
        :showComments="showComments"
        :activeComponent="activeComponent"
      />

      <div v-if="showComments">
        <div class="comment-header-container">
          <h3 class="comment-header">Comments</h3>
        </div>
        <AddComment
          v-on:updated="updatedComment"
          :allComments="blog.commentsList"
          :blogId="blogId"
        />
        <CommentList
          :isOwner="isOwner"
          :blogId="blogId"
          :allComments="blog.commentsList"
        />
      </div>
    </v-container>

    <!-- Drafts Details -->

    <v-container
      v-if="isOwner === true && activeComponent === 'MyDraftsDetails'"
    >
      <DetailsContainerLoader :isLoadingBlogs="isLoadingBlogs" />
      <MyDraftsDetails
        v-if="isLoadingBlogs === false"
        :blogId="blogId"
        :blog="blog"
        :isOwner="isOwner"
        :activeComponent="activeComponent"
      />
    </v-container>
  </v-content>
</template>

<script>
import { bus } from '../../../main';
import CommentList from '../../comments/CommentList';
import AddComment from '../../comments/AddComment';
import BlogDetails from './BlogDetails';
import MyPublishedDetails from './MyPublishedDetails';
import MyDraftsDetails from './MyDraftsDetails';
import DetailsContainerLoader from '../../common/Loaders/DetailsContainerLoader';
import { getBlogDetails } from '../../../apis/api';
export default {
  name: 'DetailsContainer',
  data: () => ({
    blog: {
      blogTitle: '',
      image: Image,
      authorName: '',
      publishedDate: Date,
      blogDetails: '',
      blogTags: [],
      commentsList: []
    },
    blogId: '',
    isLoadingBlogs: null,
    activeComponent: '',
    isOwner: null,
    showComments: false
  }),
  methods: {
    updatedComment(payload) {
      const { newComment } = payload;
      this.blog.commentsList.push(newComment);
      this.showComments = true;
    },
    toggleCommentSection() {
      this.showComments = !this.showComments;
    }
  },
  mounted() {
    const { name } = this.$route;
    this.activeComponent = name;
    const { id } = this.$route.params;
    this.blogId = id;
    this.isLoadingBlogs = true;
    getBlogDetails(id)
      .then(res => {
        const {
          title,
          author_name,
          pub_date,
          details,
          picture_url,
          tag_details,
          comment_details,
          is_owner
        } = res.data;
        this.blog.blogTitle = title;
        this.blog.authorName = author_name;
        this.blog.publishedDate = pub_date;
        this.blog.blogDetails = details;
        this.blog.image = picture_url;
        this.blog.blogTags = tag_details;
        const allTags = this.blog.blogTags.map(el => el.tag);
        bus.$emit('detailsTagList', allTags);
        this.blog.commentsList = JSON.parse(
          JSON.stringify(comment_details)
        ).sort((a, b) => a.id - b.id);
        this.isOwner = is_owner;
      })
      .then(() => {
        this.isLoadingBlogs = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    CommentList,
    AddComment,
    BlogDetails,
    MyPublishedDetails,
    MyDraftsDetails,
    DetailsContainerLoader
  }
};
</script>

<style lang="scss">
// Using ::v-deep to apply styles to child components with the below classes
#user-initials-footer {
  font-size: 2.5em !important;
}
.details-container {
  margin: 0 auto 3em auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-container {
  width: 68em;
  margin-top: 10em;
}
.blog-header {
  font-size: 3.6em;
  font-weight: 400;
  word-spacing: -2px;
  text-align: justify;
  line-height: 48px;
  font-family: 'PT Serif', serif;
}
.user-avatar {
  min-width: 48px;
  height: 48px;
  width: 48px;
}
.image-container {
  width: 68em;
  height: 45em;
  margin-top: 3em;
}
.blog-details-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.author-details-wrapper {
  width: 68em;
  display: flex;
  position: relative;
  justify-content: space-between;
  top: 2em;
}
.edit-link {
  text-decoration: none;
}
.edit-blog-btn {
  margin-left: auto;
}
.tag-chips-container {
  display: flex;
  flex-wrap: wrap;
  width: 68em;
}
.tag-description {
  font-size: 1.35em;
  line-height: 22px;
  margin-top: 1.5em !important;
  position: relative;
  left: -0.5em;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54) !important;
  background: #f2f2f2 !important;
}
.blog-details-divider {
  width: 68em;
  margin-top: 3em;
}
.blog-details-divider-second {
  width: 68em;
  margin-top: 1em;
}
.blog-details-footer-wrapper {
  width: 68em;
}
.blog-details-footer-container {
  padding-top: 2.5em;
}
.user-avatar-footer {
  position: relative;
  bottom: 1.9em;
}
.author-details-title {
  color: rgba(0, 0, 0, 0.54);
  font-size: 1.35em;
  line-height: 20px;
  letter-spacing: 0.7px;
}
.author-details-footer {
  display: inline-block;
  padding: 0.3em 2em 2em 2em;
}
.author-name {
  font-size: 2.5em;
  position: relative;
  bottom: 0.6em;
  line-height: 36px;
}
.description-container {
  position: relative;
  margin-top: 5em;
  width: 68em;
  margin-bottom: 2em;
}
.short-description {
  white-space: pre-line;
  font-size: 1.9em;
  margin-top: 1em;
  text-align: justify;
  line-height: 33px;
  font-weight: 400;
  word-spacing: -1.8px;
  color: rgba(0, 0, 0, 0.84);
  word-wrap: break-word;
  font-family: 'PT Serif', serif;
  letter-spacing: 0.2px;
}
.responses-container {
  border: 1px solid rgba(3, 168, 124, 1);
  padding: 2em;
  width: 68em;
  margin-top: 2.2em;
  border-radius: 4px;
  cursor: pointer;
}
.response-content-msg {
  color: #029e74;
  font-size: 1.4em;
  font-weight: 400;
  margin: 0 auto;
}
.comment-header-container {
  width: 68em;
  display: flex;
  margin: 0 auto;
}
.comment-header {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.68);
  font-size: 1.4em;
  margin-bottom: 1em;
}
</style>
