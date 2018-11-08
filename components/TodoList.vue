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
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :check-all="!anyRemaining"/>
    </transition-group>
    <div>
      <v-layout
        align-center>
        <todo-check-all :any-remaining="anyRemaining"/>
        <todo-item-remaining :remaining="remaining"/>
      </v-layout>
    </div>
    <div>
      <v-layout
        align-center>
        <v-flex
          xs12
          text-xs-left>
          <div
            class="extra-container">
            <v-btn
              :input-value="filter == 'all'"
              @click="filter = 'all'">
              所有
            </v-btn>
            <v-btn
              :input-value="filter == 'active'"
              @click="filter = 'active'">
              進行中
            </v-btn>
            <v-btn
              :input-value="filter == 'completed'"
              @click="filter = 'completed'">
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
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
import TodoItemRemaining from './TodoItemRemaining.vue';
import TodoCheckAll from './TodoCheckAll.vue';

export default {
  components: {
    TodoItem,
    TodoItemRemaining,
    TodoCheckAll,
  },
  data() {
    return {
      todoCreated: '',
      todoBeforeEdit: '',
      filter: 'all',
      idForTodo: 3,
      todos: [
        {
          id: 1,
          title: '完成作業',
          completed: false,
          editing: false,
        },
        {
          id: 2,
          title: '繳交費用',
          completed: false,
          editing: false,
        },
      ],
    };
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining !== 0;
    },
    todosFiltered() {
      switch (this.filter) {
        case 'all':
          return this.todos;
        case 'active':
          return this.todos.filter((todo) => !todo.completed);
        case 'completed':
          return this.todos.filter((todo) => todo.completed);
        default:
          return this.todos;
      }
    },
    showClearCompletedTodo() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
  },
  created() {
    this.$bus.$on('destroyTodo', (index) => this.destroyTodo(index));
    this.$bus.$on('doneEditTodo', (data) => this.doneEditTodo(data));
    this.$bus.$on('checkAllTodos', (checked) => this.checkAllTodos(checked));
  },
  methods: {
    createTodo() {
      if (this.todoCreated.trim().length === 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.todoCreated,
        completed: false,
        editing: false,
      });
      this.todoCreated = '';
      this.idForTodo += 1;
    },
    doneEditTodo(data) {
      this.todos.splice(data.index, 1, data.todo);
    },
    destroyTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => {
        todo.completed = window.event.target.checked;
      });
    },
    clearCompletedTodo() {
      this.todos = this.todos.filter((todo) => !todo.completed);
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
