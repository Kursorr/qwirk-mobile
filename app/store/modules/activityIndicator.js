export default {
    namespaced: true,
    state: {
        activityIndicator: false
    },
    getters: {
        insideActivityIndicator: state => state.activityIndicator,
    },
    actions: {
        setInsideActivityIndicator(store, bool) {
            store.commit('SET_TEXT', bool);
        }
    },
    mutations: {
        SET_TEXT(state, bool) {
            state.activityIndicator = bool;
        }
    }
};
//# sourceMappingURL=activityIndicator.js.map