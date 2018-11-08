import Vue from 'vue';

const eventBus = {};

eventBus.install = () => {
  Vue.prototype.$bus = new Vue();
};

Vue.use(eventBus);
