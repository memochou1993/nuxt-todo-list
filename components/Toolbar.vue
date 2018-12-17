<template>
  <v-toolbar
    dark
    color="primary">
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn
        :to="{ name: 'index' }"
        flat
        exact>Home</v-btn>
      <v-btn
        v-show="!loggedIn"
        :to="{ name: 'auth-login' }"
        flat
        exact>Login</v-btn>
      <v-btn
        v-show="loggedIn"
        :to="{ name: 'auth-logout' }"
        flat
        exact>LogOut</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>
