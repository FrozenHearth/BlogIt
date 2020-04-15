<template>
  <v-container>
    <v-alert
      width="300"
      :style="{ position: 'absolute', right: '2em' }"
      v-if="formValid === false"
      type="error"
    >
      Login Failed. Please enter valid credentials.
    </v-alert>
    <v-alert
      width="300"
      :style="{ position: 'absolute', right: '2em' }"
      v-if="formValid === true"
      type="success"
    >
      Login Successful.
    </v-alert>
    <v-img
      :style="{ margin: '0 auto' }"
      :src="logo"
      alt="logo"
      width="200"
      height="150"
    />

    <v-form ref="form" v-model="valid">
      <v-col :style="{ margin: '1em auto 0 auto' }" cols="12" sm="6" md="3">
        <v-text-field
          v-model="username"
          :counter="30"
          :rules="nameRules"
          solo
          type="text"
          label="Username"
        ></v-text-field>
      </v-col>
      <v-col :style="{ margin: '0 auto' }" cols="12" sm="6" md="3">
        <v-text-field
          v-model="password"
          :counter="15"
          :rules="passwordRules"
          solo
          type="password"
          label="Password"
        ></v-text-field>
        <v-btn color="primary" @click.prevent="validateLogin" class="mr-4">
          Login
        </v-btn>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import ZayaLogo from '../../assets/Zaya_Logo.png';
import { loginService } from '../../utils/authService';
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    formValid: '',
    username: '',
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
    logo: ZayaLogo
  }),
  methods: {
    validateLogin() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() === true) {
        const { username, password } = this;
        loginService({ username, password })
          .then(() => {
            this.formValid = true;
            setTimeout(() => {
              this.$router.push('/blogs');
            }, 1000);
          })
          .catch(() => {
            this.formValid = false;
          });
      }
    }
  }
  // props: {
  //   msg: String,
  //   title: String
  // }
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
