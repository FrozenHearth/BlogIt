<template>
  <div>
    <v-avatar
      :width="userCommentAvatarWidth"
      :height="userCommentAvatarHeight"
      :min-width="userCommentAvatarMinWidth"
      class="user-avatar"
      default
    >
      <span id="user-initials" class="white--text headline ">{{
        initials ? initials.substring(0, 2).toUpperCase() : 'N/A'
      }}</span>
    </v-avatar>
    <span :style="{ color: `${this.userNameColor}` }" class="user-name">{{
      initials ? initials.charAt(0).toUpperCase() + initials.slice(1) : 'N/A'
    }}</span>
    <p class="posted-date">{{ todaysDate() }}</p>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'UserInfo',
  props: [
    'initials',
    'datePosted',
    'userCommentAvatarWidth',
    'userCommentAvatarHeight',
    'userCommentAvatarMinWidth',
    'userNameColor'
  ],
  methods: {
    todaysDate() {
      if (this.datePosted) {
        return moment(this.datePosted).format('LL');
      } else {
        return 'N/A';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#user-initials {
  font-size: 1.5em !important;
}
.user-name {
  font-size: 1.45em;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.84);
  position: relative;
  left: 0.7em;
  bottom: 0.7em;
}
.user-avatar {
  background: #3ca8e8 !important;
}
.posted-date {
  font-size: 1.35em;
  position: relative;
  left: 4.2em;
  bottom: 1.9em;
  color: rgba(0, 0, 0, 0.54);
}
</style>
