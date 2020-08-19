"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespaced: true,
    state: {
        footer: 'lol'
    },
    getters: {
        gfooterComponent: function (state) { return state.footer; }
    },
    actions: {
        sfooterComponent: function (store, element) {
            store.commit('SET_ELEMENT', element);
        }
    },
    mutations: {
        SET_ELEMENT: function (state, element) {
            state.footer = element;
        }
    }
};
