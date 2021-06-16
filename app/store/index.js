import Vue from 'nativescript-vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import modules from './modules';
const store = new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production'
});
Vue.prototype.$store = store; /* For access to all async component tree */
export default store;
//# sourceMappingURL=index.js.map