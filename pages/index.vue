<template>
  <v-layout>
    <div class="container">
      <logo class="logo"/>
      <todo-list/>
    </div>
  </v-layout>
</template>

<script>
import Logo from '../components/Logo.vue';
import TodoList from '../components/TodoList.vue';

export default {
  components: {
    Logo,
    TodoList,
  },
};
</script>

<style lang="scss">
.logo {
  height: 100px;
}
</style>
