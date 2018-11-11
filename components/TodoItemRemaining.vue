<template>
  <v-flex
    xs6
    text-xs-right>
    <div>
      剩餘 {{ remaining }} 件未完成事項
    </div>
  </v-flex>
</template>

<script>
export default {
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
  },
};
</script>
