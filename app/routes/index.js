"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var tslib_1 = require("tslib");
var App_vue_1 = tslib_1.__importDefault(require("../views/App.vue"));
var Home_vue_1 = tslib_1.__importDefault(require("../views/Home.vue"));
var Profile_vue_1 = tslib_1.__importDefault(require("../views/Profile.vue"));
var Friends_vue_1 = tslib_1.__importDefault(require("../views/Friends.vue"));
exports.routes = {
    app: {
        component: App_vue_1.default
    },
    home: {
        component: Home_vue_1.default
    },
    profile: {
        component: Profile_vue_1.default,
        meta: { title: 'Profile' }
    },
    friends: {
        component: Friends_vue_1.default
    }
};
