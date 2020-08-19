export default {
  namespaced: true,
  state: {
    footer: 'lol'
  },
  getters: {
    gfooterComponent: state => state.footer
  },
  actions: {
    sfooterComponent (store, element) {
      store.commit('SET_ELEMENT', element)
    }
  },
  mutations: {
    SET_ELEMENT (state, element) {
      state.footer = element
    }
  }
}
