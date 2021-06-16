"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var tslib_1 = require("tslib");
var App_vue_1 = tslib_1.__importDefault(require("../views/App.vue"));
var Home_vue_1 = tslib_1.__importDefault(require("../views/Home.vue"));
var Profile_vue_1 = tslib_1.__importDefault(require("../views/Profile.vue"));
var Friends_vue_1 = tslib_1.__importDefault(require("../views/Friends.vue"));
var Editor_vue_1 = tslib_1.__importDefault(require("../views/Editor.vue"));
var Welcome_vue_1 = tslib_1.__importDefault(require("../views/Welcome.vue"));
var TestMultiplePicker_vue_1 = tslib_1.__importDefault(require("../components/TestMultiplePicker.vue"));
var TestParallax_vue_1 = tslib_1.__importDefault(require("../views/TestParallax.vue"));
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
    },
    editor: {
        component: Editor_vue_1.default
    },
    welcome: {
        component: Welcome_vue_1.default
    },
    pickers: {
        component: TestMultiplePicker_vue_1.default
    },
    testParallax: {
        component: TestParallax_vue_1.default
    }
};
