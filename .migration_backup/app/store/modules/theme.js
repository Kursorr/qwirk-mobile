"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespaced: true,
    state: {
        theme: 'darker'
    },
    getters: {
        theme: function (state) { return state.theme; }
    },
    actions: {
        setLighter: function (store, theme) {
            store.commit('UPDATE_THEME', theme);
        },
        setDarker: function (store, theme) {
            store.commit('UPDATE_THEME', theme);
        }
    },
    mutations: {
        UPDATE_THEME: function (state, theme) {
            state.theme = theme;
        }
    }
};
