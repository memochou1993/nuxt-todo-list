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
  props: {
    remaining: {
      type: Number,
      required: true,
      default: 0,
    },
  },
};
</script>
