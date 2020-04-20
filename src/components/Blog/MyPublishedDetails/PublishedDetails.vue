<template>
  <v-content v-if="this.isOwner === true">
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
            blog.blogDetails.charAt(0).toUpperCase() + blog.blogDetails.slice(1)
          }}
        </p>
      </div>
      <div class="tags-container">
        <v-chip
          ripple
          label
          v-for="tagName of blog.blogTags"
          :key="tagName.id"
          class="ma-2"
        >
          {{ tagName.tag.charAt(0).toUpperCase() + tagName.tag.slice(1) }}
        </v-chip>
      </div>
    </div>
    <div class="comment-header-container">
      <h3 class="comment-header">Comments</h3>
    </div>
    <AddComment :blogId="blogId" />
    <CommentList :blogId="blogId" :allComments="blog.commentsList" />
  </v-content>
</template>

<script>
import UserInfo from '../../common/UserInfo';
import CommentList from '../../Comments/CommentList';
import AddComment from '../../Comments/AddComment';
import axios from 'axios';
export default {
  name: 'BlogDetails',
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
    isOwner: null
  }),
  mounted() {
    const { id } = this.$route.params;
    this.blogId = id;

    axios.get(`${axios.defaults.baseURL}/blogapp/blogs/${id}`).then(res => {
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
      this.isOwner = is_owner;
      if (is_owner === true) {
        this.blog.blogTitle = title;
        this.blog.authorName = author_name;
        this.blog.publishedDate = pub_date;
        this.blog.blogDetails = details;
        this.blog.image = picture_url;
        this.blog.blogTags = tag_details;
        this.blog.commentsList = JSON.parse(JSON.stringify(comment_details));
      } else {
        this.$router.push('/myPublished');
      }
    });
  },
  // updated() {
  //   this.$nextTick(() => {
  //     const { id } = this.$route.params;
  //     axios.get(`${axios.defaults.baseURL}/blogapp/blogs/${id}`).then(res => {
  //       console.log(res.data);
  //       const { comment_details } = res.data;
  //       this.blog.commentsList = JSON.parse(JSON.stringify(comment_details));
  //     });
  //   });

  //   // axios.get(`${axios.defaults.baseURL}/blogapp/blogs/${id}`).then(res => {
  //   //   const { comment_details } = res.data;
  //   //   this.blog.commentsList = JSON.parse(JSON.stringify(comment_details));
  //   // });
  // },

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
  width: 60em;
  margin-top: 10em;
}
.blog-title {
  font-size: 3.5em;
  font-weight: 300;
  text-align: justify;
  line-height: 66px;
  letter-spacing: -1.5px;
  word-spacing: -2px;
}
.image-container {
  width: 60em;
  height: 60em;
  background-size: cover;
  background-position: top right;
  margin-top: 5em;
  border-radius: 4px;
}
.author-details-wrapper {
  width: 60em;
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
  width: 60em;
}
.blog-description-container {
  position: relative;
  margin-top: 5em;
  width: 60em;
  margin-bottom: 2em;
}
.blog-description {
  font-size: 2em;
  text-align: justify;
  line-height: 35px;
  font-weight: 400;
  word-spacing: -2px;
  word-wrap: break-word;
}
.comment-header-container {
  width: 60em;
  display: flex;
  margin: 0 auto;
}
.comment-header {
  font-weight: 500;
  font-size: 1.7em;
  margin-bottom: 1em;
}
</style>
