import Vue from 'nativescript-vue';
/* Router */
import Navigator from 'nativescript-vue-navigator';
import { routes } from './routes';
/* Components */
import App from './views/App.vue';
import Header from './components/Layout/Global/Header.vue';
import Avatar from './components/Avatar.vue';
import Icon from './components/Icon.vue';
/* Gif Support */
Vue.registerElement('ImageCacheIt', () => require('@triniwiz/nativescript-image-cache-it').ImageCacheIt);
import { ImageCacheIt } from '@triniwiz/nativescript-image-cache-it';
//hook into the device's lowmemory events
ImageCacheIt.enableAutoMM();
const icons = require('./assets/icons/icons.json');
Vue.component('Header', Header);
Vue.component('Icon', Icon);
Vue.component('Avatar', Avatar);
Vue.prototype.$icons = icons;
Vue.prototype.$globalState = new Vue({
    data: {
        footer: false,
        opacity: false
    },
    methods: {
        showFooter() { this.footer = true; },
        hideFooter() { this.footer = false; },
        addOpacity() { this.opacity = true; },
        removeOpacity() { this.opacity = false; }
    }
});
/* Uses */
Vue.use(Navigator, { routes });
/* States */
import store from '@/store';
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__;
new Vue({
    store,
    render: (h) => h(App)
}).$start();
//# sourceMappingURL=app.js.map