<template>
  <v-content>
    <v-container v-if="activeComponent === 'BlogDetails'">
      <div class="blog-details-container">
        <div class="blog-title-container">
          <h2 class="blog-title">
            {{ blog.blogTitle }}
          </h2>
        </div>
        <div class="author-details-wrapper">
          <UserInfo
            :initials="blog.authorName"
            :datePosted="blog.publishedDate"
          />
          <router-link
            v-if="isOwner"
            class="edit-link"
            :to="{ name: 'CreateBlog', params: { id: `${blogId}` } }"
          >
            <v-btn text icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </router-link>
        </div>

        <div class="image-container">
          <img class="blog-details-image" :src="blog.image" alt="" />
        </div>

        <div class="blog-description-container">
          <p class="blog-description">
            {{
              blog.blogDetails.charAt(0).toUpperCase() +
                blog.blogDetails.slice(1)
            }}
          </p>
        </div>
        <div class="tags-container">
          <v-chip
            class="tag-description ma-2"
            ripple
            label
            v-for="tagName of blog.blogTags"
            :key="tagName.id"
          >
            {{ tagName.tag.charAt(0).toUpperCase() + tagName.tag.slice(1) }}
          </v-chip>
        </div>
        <v-divider class="blog-details-divider"></v-divider>
        <footer class="blog-details-footer-wrapper">
          <div class="blog-details-footer-container">
            <v-avatar
              width="80"
              height="80"
              class="user-avatar-footer"
              default
              color="primary"
            >
              <span id="user-initials-footer" class="white--text headline ">{{
                blog.authorName
                  ? blog.authorName.substring(0, 2).toUpperCase()
                  : 'N/A'
              }}</span>
            </v-avatar>
            <div class="author-details-footer">
              <p class="author-details-title">WRITTEN BY</p>
              <h2 class="author-name">
                {{
                  blog.authorName.charAt(0).toUpperCase() +
                    blog.authorName.slice(1)
                }}
              </h2>
            </div>
          </div>
        </footer>
        <v-divider class="blog-details-divider-second"></v-divider>
        <div class="responses-container" @click="toggleCommentSection">
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
      <div v-if="showComments">
        <div class="comment-header-container">
          <h3 class="comment-header">Responses</h3>
        </div>
        <AddComment v-on:updated="updatedComment" :blogId="blogId" />
        <CommentList
          :isOwner="isOwner"
          :blogId="blogId"
          :allComments="blog.commentsList"
        />
      </div>
    </v-container>

    <!--  -->

    <v-container
      v-if="isOwner === true && activeComponent === 'PublishedDetails'"
    >
      <div class="blog-details-container">
        <div class="blog-title-container">
          <h2 class="blog-title">
            {{ blog.blogTitle }}
          </h2>
        </div>
        <div class="author-details-wrapper">
          <UserInfo
            :initials="blog.authorName"
            :datePosted="blog.publishedDate"
          />
          <router-link
            class="edit-link"
            :to="{ name: 'CreateBlog', params: { id: `${blogId}` } }"
          >
            <v-btn text icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </router-link>
        </div>

        <div class="image-container">
          <img class="blog-details-image" :src="blog.image" alt="" />
        </div>

        <div class="blog-description-container">
          <p class="blog-description">
            {{
              blog.blogDetails.charAt(0).toUpperCase() +
                blog.blogDetails.slice(1)
            }}
          </p>
        </div>
        <div class="tags-container">
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
            <v-avatar
              width="80"
              height="80"
              class="user-avatar-footer"
              default
              color="primary"
            >
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
        <div class="responses-container" @click="toggleCommentSection">
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
      <div v-if="showComments">
        <div class="comment-header-container">
          <h3 class="comment-header">Responses</h3>
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
  </v-content>
</template>

<script>
import UserInfo from './UserInfo';
import CommentList from '../comments/CommentList';
import AddComment from '../comments/AddComment';
import { getBlogDetails } from '../../apis/api';
export default {
  name: 'DetailsView',
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
    activeComponent: '',
    isOwner: null,
    showComments: false
  }),
  methods: {
    toggleCommentSection() {
      this.showComments = !this.showComments;
    },
    updatedComment(payload) {
      const { newComment } = payload;
      this.blog.commentsList.push(newComment);
      this.showComments = true;
    }
  },
  mounted() {
    const { name } = this.$route;
    this.activeComponent = name;
    console.log(this.activeComponent);
    const { id } = this.$route.params;
    this.blogId = id;
    getBlogDetails(id).then(res => {
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
      this.blog.commentsList = JSON.parse(JSON.stringify(comment_details)).sort(
        (a, b) => a.id - b.id
      );
      this.isOwner = is_owner;
    });
  },
  components: {
    CommentList,
    AddComment,
    UserInfo
  }
};
</script>

<style lang="scss" scoped>
#user-initials-footer {
  font-size: 2.5em !important;
}
.blog-details-container {
  margin: 0 auto 3em auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-title-container {
  width: 68em;
  margin-top: 10em;
}
.blog-title {
  font-size: 3.4em;
  font-weight: 400;
  word-spacing: -2px;
  text-align: justify;
  line-height: 48px;
  font-family: 'Merriweather', serif;
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
.tags-container {
  display: flex;
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
.blog-description-container {
  position: relative;
  margin-top: 5em;
  width: 68em;
  margin-bottom: 2em;
}
.blog-description {
  font-size: 2em;
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
