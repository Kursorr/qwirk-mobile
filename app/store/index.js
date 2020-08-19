"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var nativescript_vue_1 = tslib_1.__importDefault(require("nativescript-vue"));
var vuex_1 = tslib_1.__importDefault(require("vuex"));
var modules_1 = tslib_1.__importDefault(require("./modules"));
nativescript_vue_1.default.use(vuex_1.default);
exports.default = new vuex_1.default.Store({
    modules: modules_1.default,
    strict: process.env.NODE_ENV !== 'production'
});
