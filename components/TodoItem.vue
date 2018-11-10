<template>
  <div>
    <v-layout
      wrap
      align-center>
      <v-flex
        xs1>
        <input
          v-model="completed"
          type="checkbox"
          @change="doneEditTodo">
      </v-flex>
      <v-flex
        xs10
        text-xs-left>
        <div
          v-if="!editing"
          :class="{ completed : completed }"
          class="todo-item-label"
          @dblclick="startEditTodo">
          {{ title }}
        </div>
        <input
          v-focus
          v-else
          v-model="title"
          type="text"
          class="todo-item-edit"
          @blur="doneEditTodo"
          @keyup.enter="doneEditTodo"
          @keyup.esc="cancelEditTodo">
      </v-flex>
      <v-flex
        xs1>
        <div
          class="remove-item"
          @click="destroyTodo(index)">
          &times;
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  props: {
    todo: {
      type: Object,
      requited: true,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      requited: true,
      default: 0,
    },
    checkAll: {
      type: Boolean,
      requited: true,
      default: false,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      todoBeforeEdit: '',
    };
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
  },
  methods: {
    startEditTodo() {
      this.todoBeforeEdit = this.title;
      this.editing = true;
    },
    doneEditTodo() {
      if (this.title.trim().length === 0) {
        this.title = this.todoBeforeEdit;
      }
      this.editing = false;
      this.$bus.$emit('doneEditTodo', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
        },
      });
    },
    cancelEditTodo() {
      this.title = this.todoBeforeEdit;
      this.editing = false;
    },
    destroyTodo(index) {
      this.$bus.$emit('destroyTodo', index);
    },
  },
};
</script>
