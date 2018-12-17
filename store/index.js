import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    credentials: {
      username: '',
      password: '',
    },
    token: localStorage.getItem('access_token') || null,
    message: '',
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
    loggedIn(state) {
      return state.token !== null;
    },
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
  mutations: {
    retrieveMessage(state, message) {
      state.message = message;
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    createTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
      });
    },
    clearCompletedTodo(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    changeFilter(state, filter) {
      state.filter = filter;
    },
    checkAllTodos(state, checked) {
      state.todos.forEach((todo) => {
        todo.completed = checked;
      });
    },
    doneEditTodo(state, todo) {
      const index = state.todos.findIndex((item) => item.id === todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing,
      });
    },
    destroyTodo(state, index) {
      state.todos.splice(index, 1);
    },
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        this.$axios({
          method: 'POST',
          url: 'http://passport.test/oauth/token',
          data: {
            grant_type: process.env.grantType,
            client_id: process.env.clientId,
            client_secret: process.env.clientSecret,
            username: credentials.username,
            password: credentials.password,
          },
        })
          .then(({ data }) => {
            const token = `${data.token_type} ${data.access_token}`;
            localStorage.setItem('access_token', token);
            context.commit('retrieveToken', token);
            resolve(data);
          })
          .catch((error) => {
            context.commit('retrieveMessage', error.response.data.message);
            reject(error);
          });
      });
    },
    destroyToken(context) {
      return new Promise((resolve, reject) => {
        this.$axios({
          method: 'GET',
          url: 'http://passport.test/api/user/logout',
          headers: {
            Authorization: context.state.token,
          },
        })
          .then((response) => {
            localStorage.removeItem('access_token');
            context.commit('destroyToken');
            resolve(response);
          })
          .catch((error) => {
            localStorage.removeItem('access_token');
            context.commit('destroyToken');
            reject(error);
          });
      });
    },
    createTodo(context, todo) {
      setTimeout(() => {
        context.commit('createTodo', todo);
      }, 0);
    },
    clearCompletedTodo(context) {
      setTimeout(() => {
        context.commit('clearCompletedTodo');
      }, 0);
    },
    changeFilter(context, filter) {
      setTimeout(() => {
        context.commit('changeFilter', filter);
      }, 0);
    },
    checkAllTodos(context, checked) {
      setTimeout(() => {
        context.commit('checkAllTodos', checked);
      }, 0);
    },
    doneEditTodo(context, todo) {
      setTimeout(() => {
        context.commit('doneEditTodo', todo);
      }, 0);
    },
    destroyTodo(context, index) {
      setTimeout(() => {
        context.commit('destroyTodo', index);
      }, 0);
    },
  },
});

export default () => store;
