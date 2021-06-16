export default {
    namespaced: true,
    state: {
        theme: 'darker'
    },
    getters: {
        theme: state => state.theme
    },
    actions: {
        setLighter(store, theme) {
            store.commit('UPDATE_THEME', theme);
        },
        setDarker(store, theme) {
            store.commit('UPDATE_THEME', theme);
        }
    },
    mutations: {
        UPDATE_THEME(state, theme) {
            state.theme = theme;
        }
    }
};
//# sourceMappingURL=theme.js.map