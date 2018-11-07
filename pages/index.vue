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
* {
  box-sizing: border-box;
}
#app {
  color: #2c3e50;
  font-size: 18px;
  padding-top: 40px;
}
.container {
  max-width: 600px;
  text-align: center;
}
.logo {
  height: 100px;
}
</style>
