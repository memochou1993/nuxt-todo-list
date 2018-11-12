<template>
  <transition name="fade">
    <v-btn
      v-if="showClearCompletedTodo"
      @click="clearCompletedTodo">
      清除
    </v-btn>
  </transition>
</template>

<script>
export default {
  computed: {
    showClearCompletedTodo() {
      return this.$store.getters.showClearCompletedTodo;
    },
  },
  methods: {
    clearCompletedTodo() {
      this.$store.dispatch('clearCompletedTodo');
    },
  },
};
</script>
