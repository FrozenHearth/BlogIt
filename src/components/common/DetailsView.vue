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
        </div>

        <div
          :style="{ backgroundImage: `url(${blog.image})` }"
          class="image-container"
        ></div>

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
        <footer class="blog-details-footer"></footer>
      </div>
      <div class="comment-header-container">
        <h3 class="comment-header">Comments</h3>
      </div>
      <AddComment :blogId="blogId" />
      <CommentList :allComments="blog.commentsList" />
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
            <v-btn class="edit-blog-btn" color="primary">
              Edit Blog
            </v-btn>
          </router-link>
        </div>

        <div
          :style="{ backgroundImage: `url(${blog.image})` }"
          class="image-container"
        ></div>

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
        <footer class="blog-details-footer"></footer>
        <v-divider dark></v-divider>
      </div>
      <div class="comment-header-container">
        <h3 class="comment-header">Comments</h3>
      </div>
      <AddComment :blogId="blogId" />
      <CommentList :blogId="blogId" :allComments="blog.commentsList" />
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
    isOwner: null
  }),
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
      this.blog.commentsList = JSON.parse(JSON.stringify(comment_details));
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
  background-size: cover;
  background-position: top right;
  margin-top: 3em;
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
.blog-description-container {
  position: relative;
  margin-top: 5em;
  width: 68em;
  margin-bottom: 2em;
}
.blog-description {
  font-size: 1.8em;
  text-align: justify;
  line-height: 33px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.84);
  word-wrap: break-word;
  font-family: 'Merriweather', serif;
}
.comment-header-container {
  width: 68em;
  display: flex;
  margin: 0 auto;
}
.comment-header {
  font-weight: 500;
  font-size: 1.7em;
  margin-bottom: 1em;
}
</style>
