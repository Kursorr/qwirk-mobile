"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    namespaced: true,
    state: {
        activityIndicator: false
    },
    getters: {
        insideActivityIndicator: function (state) { return state.activityIndicator; },
    },
    actions: {
        setInsideActivityIndicator: function (store, bool) {
            store.commit('SET_TEXT', bool);
        }
    },
    mutations: {
        SET_TEXT: function (state, bool) {
            state.activityIndicator = bool;
        }
    }
};
