"use strict";
/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var files = require.context('.', false, /\.js$/);
var modules = {};
files.keys().forEach(function (key) {
    if (key === './index.js')
        return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});
exports.default = modules;
