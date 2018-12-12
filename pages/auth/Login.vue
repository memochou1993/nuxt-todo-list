<template>
  <div>
    <v-form
      v-model="valid">
      <v-text-field
        v-model="username"
        :rules="rules.username"
        label="Username"
        hint=""
        class="my-3"
        required
      />
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
        :rules="rules.password"
        label="Password"
        hint=""
        class="my-3"
        counter
        required
        @click:append="showPassword = !showPassword"
      />
      <v-flex
        text-xs-right>
        <v-btn
          :disabled="!valid"
          @click="login()">
          登入
        </v-btn>
      </v-flex>
    </v-form>
    {{ tokenType }} {{ accessToken }}
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      username: '',
      password: '',
      showPassword: false,
      rules: {
        username: [
          (v) => !!v || 'Username is required',
          (v) => /.+@.+/.test(v) || 'Username must be valid.',
        ],
        password: [
          (v) => !!v || 'Password is required',
          (v) => v.length >= 6 || 'Password must be at least 6.',
        ],
      },
      tokenType: '',
      accessToken: '',
      message: '',
    };
  },
  methods: {
    login() {
      this.$axios({
        method: 'POST',
        url: 'http://passport.test/oauth/token',
        data: {
          grant_type: process.env.grantType,
          client_id: process.env.clientId,
          client_secret: process.env.clientSecret,
          username: this.username,
          password: this.password,
        },
      })
        .then(({ data }) => {
          this.tokenType = data.token_type;
          this.accessToken = data.access_token;
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
  },
};
</script>
