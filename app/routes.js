"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var tslib_1 = require("tslib");
var App_vue_1 = tslib_1.__importDefault(require("./views/App.vue"));
var Profile_vue_1 = tslib_1.__importDefault(require("./views/Profile.vue"));
var Friends_vue_1 = tslib_1.__importDefault(require("./views/Friends.vue"));
exports.routes = {
    '/app': {
        component: App_vue_1.default
    },
    '/profile': {
        component: Profile_vue_1.default
    },
    '/friends': {
        component: Friends_vue_1.default
    }
};
