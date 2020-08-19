export default {
  namespaced: true,
  state: {
    footer: false
  },
  getters: {
    gfooter: state => state.footer
  },
  actions: {
    sfooter (store, bool) {
      store.commit('SET_ELEMENT', bool)
    }
  },
  mutations: {
    SET_ELEMENT (state, bool) {
      state.footer = bool
    }
  }
}
