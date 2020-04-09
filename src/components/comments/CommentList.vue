<template>
  <div class="comment-list-wrapper">
    <div class="comment-list" fluid>
      <UserInfo />
      <span class="icon-container">
        <v-btn text icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn text icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </span>
      <p class="comment-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        deleniti nesciunt corporis illo delectus qui quidem at repellat dolore
        quos porro vero, et aliquid id eos officia? Nihil, nisi impedit. Lorem
        ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
    <div class="comment-list" fluid>
      <UserInfo />
      <span class="icon-container">
        <v-btn text icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn text icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </span>
      <p class="comment-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        deleniti nesciunt corporis illo delectus qui quidem at repellat dolore
        quos porro vero, et aliquid id eos officia? Nihil, nisi impedit. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
        necessitatibus expedita odio quaerat accusantium est fugit, dolorem ea
        doloremque atque officia corporis ullam reiciendis repellendus neque
        cum, voluptate animi commodi! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corporis temporibus, libero quam illo, repellat alias
        fugit blanditiis repellendus in ratione reiciendis? Enim, eum explicabo
        adipisci nam molestias id quas amet!
      </p>
    </div>
  </div>
</template>

<script>
import UserInfo from '../common/UserInfo';
export default {
  name: 'CommentList',
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
  width: 60em;
  margin: 0 auto 4em auto;
}
.comment-list {
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  margin: 0 auto;
  position: relative;
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
