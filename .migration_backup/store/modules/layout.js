"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespaced: true,
    state: {
        footer: false
    },
    getters: {
        gfooter: function (state) { return state.footer; }
    },
    actions: {
        sfooter: function (store, bool) {
            store.commit('SET_ELEMENT', bool);
        }
    },
    mutations: {
        SET_ELEMENT: function (state, bool) {
            state.footer = bool;
        }
    }
};
