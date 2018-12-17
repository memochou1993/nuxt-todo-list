<template>
  <v-app>
    <Toolbar/>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from '../components/Toolbar.vue';

export default {
  components: {
    Toolbar,
  },
};
</script>

<style lang="scss">
.container {
  padding-top: 20px;
  max-width: 600px;
  text-align: center;
}
</style>
