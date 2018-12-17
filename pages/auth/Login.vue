<template>
  <div class="container">
    <v-form
      v-model="valid"
      @submit.prevent="login()">
      <v-text-field
        v-model="credentials.username"
        :rules="rules.username"
        label="Username"
        hint=""
        class="my-3"
        required
      />
      <v-text-field
        v-model="credentials.password"
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
          type="submit">
          登入
        </v-btn>
      </v-flex>
    </v-form>
    {{ this.$store.state.message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      credentials: {
        username: '',
        password: '',
      },
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
      message: '',
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch('retrieveToken', {
          username: this.credentials.username,
          password: this.credentials.password,
        })
        .then(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>
