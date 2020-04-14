<template>
  <v-content>
    <div class="blog-details-container">
      <img :src="image" alt="" class="feature-image" />
      <div class="blog-title-container">
        <h2 class="blog-title">
          Top 10 places to visit in Yoho National Park Top 10 places to visit in
          Yoho National Park Top 10 places to visit in Yoho National Park Top 10
          places to visit in Yoho National Park
        </h2>
      </div>
      <div class="author-details-wrapper">
        <UserInfo />
      </div>
      <div class="tags-container">
        <v-chip class="ma-2" outlined>
          Nature
        </v-chip>
        <v-chip class="ma-2" outlined>
          Outdoors
        </v-chip>
        <v-chip class="ma-2" outlined>
          Hiking
        </v-chip>
        <v-chip class="ma-2" outlined>
          Bliss
        </v-chip>
      </div>

      <div class="blog-description-container">
        <p class="blog-description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
          nulla voluptatum aperiam nesciunt nostrum quod natus minus animi dicta
          magnam et numquam ut corporis explicabo laudantium odio quo, ipsum
          officia! Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
          accusamus dolore atque eum maxime velit praesentium culpa, harum nobis
          ipsam explicabo sed. Id earum beatae obcaecati temporibus pariatur
          officia eaque. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quasi magnam quis repellendus eius consequuntur corrupti fuga
          molestias excepturi eveniet nisi. Porro natus, sed ipsam laborum
          voluptatum quasi distinctio placeat eveniet. Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Blanditiis, quidem laboriosam
          pariatur error fugit id sapiente sequi unde iusto cupiditate neque
          reprehenderit. Quasi, alias excepturi necessitatibus ratione
          perferendis iure minus. consectetur adipisicing elit. Blanditiis,
          quidem laboriosam pariatur error fugit id sapiente sequi unde iusto
          cupiditate neque reprehenderit. Quasi, alias excepturi necessitatibus
          ratione perferendis iure minus.
        </p>
      </div>
    </div>
    <div class="comment-header-container">
      <h3 class="comment-header">Comments</h3>
    </div>
    <AddComment />
    <CommentList />
  </v-content>
</template>

<script>
import NatureImage from '../../assets/nature.jpeg';
import UserInfo from '../common/UserInfo';
import CommentList from '../comments/CommentList';
import AddComment from '../comments/AddComment';
export default {
  name: 'PublishedDetails',
  data: () => ({
    image: NatureImage
  }),
  components: {
    UserInfo,
    CommentList,
    AddComment
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
}
.blog-title {
  font-size: 3.5em;
  font-weight: 300;
  text-align: justify;
  line-height: 66px;
  letter-spacing: -1.5px;
  word-spacing: -2px;
}
.feature-image {
  width: 60em;
  height: 60em;
  object-fit: cover;
  margin-top: 12em;
  border-radius: 4px;
}
.author-details-wrapper {
  width: 60em;
  display: flex;
  position: relative;
  top: 2em;
}
.tags-container {
  display: flex;
  width: 60em;
}
.blog-description-container {
  position: relative;
  top: 2em;
  width: 60em;
  margin-bottom: 2em;
}
.blog-description {
  font-size: 2em;
  text-align: justify;
  line-height: 35px;
  font-weight: 400;
  word-spacing: -2px;
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
