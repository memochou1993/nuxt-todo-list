<template>
  <v-flex
    xs6>
    <v-layout
      align-center>
      <v-flex
        xs2>
        <div>
          <input
            id="checkAllTodos"
            :checked="!anyRemaining"
            type="checkbox"
            @change="checkAllTodos">
        </div>
      </v-flex>
      <v-flex
        xs10
        text-xs-left>
        <div
          class="extra-container">
          <label
            for="checkAllTodos">
            全選
          </label>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
  },
  methods: {
    checkAllTodos() {
      this.$store.state.todos.forEach((todo) => {
        todo.completed = window.event.target.checked;
      });
    },
  },
};
</script>
