import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    filter: 'all',
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
  },
  getters: {
    remaining(state) {
      return state.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },
    filteredTodos(state) {
      switch (state.filter) {
        case 'all':
          return state.todos;
        case 'active':
          return state.todos.filter((todo) => !todo.completed);
        case 'completed':
          return state.todos.filter((todo) => todo.completed);
        default:
          return state.todos;
      }
    },
    showClearCompletedTodo(state) {
      const completedTodo = state.todos.filter((todo) => todo.completed);
      return completedTodo.length > 0;
    },
  },
});

export default () => store;
