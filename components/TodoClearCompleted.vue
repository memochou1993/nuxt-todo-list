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
  props: {
    showClearCompletedTodo: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    clearCompletedTodo() {
      this.$bus.$emit('clearCompletedTodo');
    },
  },
};
</script>
