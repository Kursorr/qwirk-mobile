import Vue from 'nativescript-vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    h: 0,
    s: 0,
    n: 0,
  },
  mutations: {
    statusBar(state, s) {
      state.s = s;
    },
    navBar(state, n) {
      state.n = n;
    },
    keyBoard(state, h) {
      state.h = h;
    },
  },
});

Vue.prototype.$store = store;
export default store;
