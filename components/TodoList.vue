<template>
  <div>
    <input
      v-model="todoCreated"
      type="text"
      class="todo-input"
      placeholder="請輸入代辦事項……"
      @keyup.enter="createTodo">
    <transition-group
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <todo-item
        v-for="(todo, index) in filteredTodos"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :check-all="!anyRemaining"
        class="todo-item"/>
    </transition-group>
    <div>
      <v-layout
        align-center>
        <todo-check-all/>
        <todo-item-remaining/>
      </v-layout>
    </div>
    <div>
      <v-layout>
        <v-flex
          xs8
          text-xs-left>
          <todo-filter/>
        </v-flex>
        <v-flex
          xs4
          text-xs-right>
          <todo-clear-completed
            :show-clear-completed-todo="showClearCompletedTodo"/>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
import TodoItemRemaining from './TodoItemRemaining.vue';
import TodoCheckAll from './TodoCheckAll.vue';
import TodoFilter from './TodoFilter.vue';
import TodoClearCompleted from './TodoClearCompleted.vue';

export default {
  components: {
    TodoItem,
    TodoItemRemaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted,
  },
  data() {
    return {
      todoCreated: '',
      todoBeforeEdit: '',
      idForTodo: 3,
    };
  },
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    filteredTodos() {
      return this.$store.getters.filteredTodos;
    },
    showClearCompletedTodo() {
      return this.$store.getters.showClearCompletedTodo;
    },
  },
  methods: {
    createTodo() {
      if (this.todoCreated.trim().length === 0) {
        return;
      }
      this.$store.commit('createTodo', {
        id: this.idForTodo,
        title: this.todoCreated,
      });
      this.todoCreated = '';
      this.idForTodo += 1;
    },
  },
};
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css');
.todo-item {
  animation-duration: 0.5s;
}
.todo-input {
  width: 100%;
  padding: 12px 12px;
  margin: 16px 0;
  border: 1px solid #eeeeee;
  &:focus {
    outline: none;
  }
}
.todo-item-label {
  padding: 10px;
  border: 1px solid #fafafa;
}
.todo-item-edit {
  width: 100%;
  padding: 10px;
  border: 1px solid #eeeeee;
  &:focus {
    outline: none;
  }
}
.remove-item {
  cursor: pointer;
  &:hover {
    color: #000000;
  }
}
.completed {
  text-decoration: line-through;
}
.extra-container {
  padding: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
