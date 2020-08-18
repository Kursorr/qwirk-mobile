"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var tslib_1 = require("tslib");
var Main_vue_1 = tslib_1.__importDefault(require("./views/Main.vue"));
var Profile_vue_1 = tslib_1.__importDefault(require("./views/Profile.vue"));
exports.routes = {
    '/main': {
        component: Main_vue_1.default
    },
    '/profile': {
        component: Profile_vue_1.default
    }
};
