"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var nativescript_vue_1 = tslib_1.__importDefault(require("nativescript-vue"));
// import Copilot from '@nativescript-copilot/vue'
var nativescript_vue_navigator_1 = tslib_1.__importDefault(require("nativescript-vue-navigator"));
var App_vue_1 = tslib_1.__importDefault(require("./views/App.vue"));
var Header_vue_1 = tslib_1.__importDefault(require("./components/Layout/Global/Header.vue"));
var Avatar_vue_1 = tslib_1.__importDefault(require("./components/Avatar.vue"));
var Icon_vue_1 = tslib_1.__importDefault(require("./components/Icon.vue"));
var routes_1 = require("./routes/");
var store_1 = tslib_1.__importDefault(require("./store/"));
require('./app.scss');
var icons = require('./assets/icons/icons.json');
nativescript_vue_1.default.component('Header', Header_vue_1.default);
nativescript_vue_1.default.component('Icon', Icon_vue_1.default);
nativescript_vue_1.default.component('Avatar', Avatar_vue_1.default);
// Vue.use(Copilot)
nativescript_vue_1.default.use(nativescript_vue_navigator_1.default, { routes: routes_1.routes });
/*if (TNS_ENV !== 'production')
  Vue.use(VueDevtools)*/
// Vue.prototype.$orientation = orientation
nativescript_vue_1.default.prototype.$icons = icons;
nativescript_vue_1.default.prototype.$globalState = new nativescript_vue_1.default({
    data: {
        footer: false,
        opacity: false
    },
    methods: {
        showFooter: function () { this.footer = true; },
        hideFooter: function () { this.footer = false; },
        addOpacity: function () { this.opacity = true; },
        removeOpacity: function () { this.opacity = false; }
    }
});
// Prints Vue logs when --env.production is *NOT* set while building
// Vue.config.silent = (TNS_ENV === 'production')
new nativescript_vue_1.default({
    store: store_1.default,
    render: function (h) { return h(App_vue_1.default); }
}).$start();
