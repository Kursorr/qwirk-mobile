"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var nativescript_vue_1 = tslib_1.__importDefault(require("nativescript-vue"));
var nativescript_vue_devtools_1 = tslib_1.__importDefault(require("nativescript-vue-devtools"));
var nativescript_vue_navigator_1 = tslib_1.__importDefault(require("nativescript-vue-navigator"));
var App_vue_1 = tslib_1.__importDefault(require("./views/App.vue"));
var routes_1 = require("./routes");
var store_1 = tslib_1.__importDefault(require("./store"));
nativescript_vue_1.default.use(nativescript_vue_navigator_1.default, { routes: routes_1.routes });
nativescript_vue_1.default.registerElement('SVGImage', function () { return require('@teammaestro/nativescript-svg').SVGImage; });
if (TNS_ENV !== 'production')
    nativescript_vue_1.default.use(nativescript_vue_devtools_1.default);
// Prints Vue logs when --env.production is *NOT* set while building
nativescript_vue_1.default.config.silent = (TNS_ENV === 'production');
new nativescript_vue_1.default({
    store: store_1.default,
    render: function (h) { return h(App_vue_1.default); }
}).$start();
