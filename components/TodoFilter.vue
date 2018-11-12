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
  </div>
</template>

<script>
export default {
  computed: {
    filter() {
      return this.$store.state.filter;
    },
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch('changeFilter', filter);
    },
  },
};
</script>
