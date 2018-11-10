<template>
  <div>
    <v-btn
      :input-value="filter == 'all'"
      @click="changeFilter('all')">
      所有
    </v-btn>
    <v-btn
      :input-value="filter == 'active'"
      @click="changeFilter('active')">
      進行中
    </v-btn>
    <v-btn
      :input-value="filter == 'completed'"
      @click="changeFilter('completed')">
      已完成
    </v-btn>
    <transition name="fade">
      <v-btn
        v-if="showClearCompletedTodo"
        @click="clearCompletedTodo">
        清除
      </v-btn>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: 'all',
    };
  },
  methods: {
    changeFilter(filter) {
      this.filter = filter;
      this.$bus.$emit('changeFilter', filter);
    },
  },
};
</script>
