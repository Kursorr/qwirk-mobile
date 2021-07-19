import Vue from 'nativescript-vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    h: 0,
    s: 0,
    n: 0,
    o: '1'
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
    opacity(state, o) {
      state.o = o;
    }
  },
});

Vue.prototype.$store = store;
export default store;
