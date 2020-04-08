<template>
  <v-content>
    <div class="fill-height" fluid>
      <img :src="image" alt="" class="feature-image" />
      <div class="blog-header">
        <div class="blog-title-container">
          <h2 class="blog-title">
            Top 10 places to visit in Yoho National Park
          </h2>
        </div>
        <div class="author-details">
          <v-avatar color="primary">
            <span id="author-initials" class="white--text headline ">VS</span>
          </v-avatar>
          <span class="author-name">Vishwanath B</span>
          <p class="blog-posted-date">{{ todaysDate() }}</p>
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
            nulla voluptatum aperiam nesciunt nostrum quod natus minus animi
            dicta magnam et numquam ut corporis explicabo laudantium odio quo,
            ipsum officia! Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. A accusamus dolore atque eum maxime velit praesentium culpa,
            harum nobis ipsam explicabo sed. Id earum beatae obcaecati
            temporibus pariatur officia eaque. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quasi magnam quis repellendus eius
            consequuntur corrupti fuga molestias excepturi eveniet nisi. Porro
            natus, sed ipsam laborum voluptatum quasi distinctio placeat
            eveniet. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Blanditiis, quidem laboriosam pariatur error fugit id sapiente sequi
            unde iusto cupiditate neque reprehenderit. Quasi, alias excepturi
            necessitatibus ratione perferendis iure minus.
          </p>
        </div>
      </div>
    </div>
  </v-content>
</template>

<script>
import NatureImage from '../../assets/nature.jpeg';
import moment from 'moment';
export default {
  name: 'BlogDetails',
  data: () => ({
    image: NatureImage
  }),
  methods: {
    todaysDate() {
      return moment(new Date()).format('DD/MM/YYYY');
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-header {
  width: 43em;
  position: relative;
  left: 41em;
}
.blog-title-container {
  width: 60em;
}
.blog-title {
  font-size: 4em;
  font-weight: 300;
  position: relative;
  left: 0.2em;
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
}
.author-details {
  position: absolute;
}
#author-initials {
  font-size: 1.5em !important;
}
.author-name {
  font-size: 1.5em;
  font-weight: 500;
  position: relative;
  left: 1em;
  bottom: 0.5em;
}
.blog-posted-date {
  font-size: 1.5em;
  position: relative;
  left: 2.1em;
  bottom: 1.5em;
}
.blog-description-container {
  position: relative;
  top: 8em;
  width: 60em;
}
.blog-description {
  font-size: 2em;
  text-align: justify;
  line-height: 35px;
  font-weight: 400;
  word-spacing: -2px;
}
</style>
