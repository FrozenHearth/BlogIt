<template>
  <v-container class="content-container">
    <v-alert
      width="300"
      class="alert-banner"
      v-if="formValid === false"
      type="error"
    >
      Login Failed. Please enter valid credentials.
    </v-alert>
    <v-alert
      class="alert-banner"
      width="300"
      v-if="formValid === true"
      type="success"
    >
      Login Successful.
    </v-alert>
    <v-toolbar fixed class="header-toolbar" flat>
      <img :src="headerLogo" alt="Header Logo" width="70" height="50" />

      <v-toolbar-title v-ripple class="header-title">Blog It</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on" class="login-btn-header">
            Sign In
          </v-btn>
        </template>
        <v-card class="modal-card">
          <v-card-title>
            <img class="logo" height="150" width="220" :src="logo" />
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-col class="username-container" cols="12" sm="6" md="6">
                <v-text-field
                  v-model="username"
                  :rules="nameRules"
                  solo
                  type="text"
                  label="Username"
                ></v-text-field>
              </v-col>
              <v-col class="password-container" cols="12" sm="6" md="6">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  solo
                  type="password"
                  label="Password"
                  @keyup.enter="validateLogin"
                ></v-text-field>
                <v-btn outlined @click="validateLogin" class="login-btn">
                  Login
                </v-btn>
              </v-col>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <div :style="{ marginTop: '12em' }" class="hero-image-container">
      <img class="hero-image" :src="blogBackground" />
    </div>

    <main class="hero-content-container">
      <h1 class="hero-content-message">
        Welcome. Sign in, and start browsing or adding your own blogs, in no
        time!
      </h1>
    </main>
  </v-container>
</template>

<script>
import ZayaLoginLogo from '../assets/Zaya_Logo.png';
import ZayaHeaderLogo from '../assets/Zaya_Header_Logo.png';
import blogBackground from '../assets/undraw_blogging_vpvv.png';
import { login } from '../apis/api';
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    formValid: '',
    username: '',
    dialog: false,
    blogBackground,
    headerLogo: ZayaHeaderLogo,
    nameRules: [
      v => !!v || 'Username cannot be blank',
      v => /^[a-zA-Z ]/.test(v) || 'Username must be valid',
      v => (v && v.length <= 30) || 'Username must be less than 30 characters'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password cannot be blank',
      v => /^[a-zA-Z]\w{3,14}$/.test(v) || 'Password must be valid',
      v => (v && v.length <= 15) || 'Password must be less than 15 characters'
    ],
    logo: ZayaLoginLogo
  }),
  methods: {
    validateLogin() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        const { username, password } = this;
        login({ username, password })
          .then(res => {
            const username = JSON.parse(res.config.data).username;
            const token = res.data.token;
            localStorage.setItem('user-token', token);
            localStorage.setItem('username', username);
            this.formValid = true;
            setTimeout(() => {
              this.$router.push('/blogs', () => this.$router.go(0));
              this.formValid = null;
            }, 1000);
          })
          .catch(err => {
            this.formValid = false;
            setTimeout(() => {
              this.formValid = null;
            }, 1000);
            localStorage.removeItem('user-token');
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content-container {
  position: relative;
}
.hero-content-container {
  top: 11em;
  position: absolute;
  left: 12em;
  width: 93em;
  line-height: 50px;
  margin-bottom: 2em;
}
.hero-content-message {
  font-size: 3em;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
  font-family: 'PT Serif', serif;
  text-align: center;
}
.hero-image-container {
  width: 93em;
  margin: 12em auto 0 auto;
  height: 64em;
}
.hero-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.alert-banner {
  position: absolute;
  right: 3em;
  z-index: 204; // Setting z-index more than the modal's which is 202
}
.header-title {
  font-family: 'PT Serif', serif;
  margin-left: 1em;
  font-size: 2.5em;
  font-weight: 700;
}
.modal-card {
  padding: 2em 0;
}
.login-btn,
.login-btn-header {
  background-color: #3ca8e8;
  border: none;
  color: #fff !important;
  width: inherit;
}
.login-btn {
  margin-top: 1em;
}
.login-btn-header {
  text-transform: capitalize;
}
.logo {
  margin: 0 auto;
}
.username-container {
  margin: 1em auto 0 auto;
}
.password-container {
  margin: 0 auto;
}
</style>
