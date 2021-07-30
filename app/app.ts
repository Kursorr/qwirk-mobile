/**
 * File: Application Bootstrap
 *
 * Date Created: 06192021
 * Date Modified: 06192021
**/

/* Core */
import Vue from 'nativescript-vue'
import App from './app.vue'


/* Router */
import { routes } from './routes'
import Navigator from 'nativescript-vue-navigator'

/* Plugins */
import Pager from '@triniwiz/nativescript-pager/vue'
import CollectionView from '@nativescript-community/ui-collectionview/vue';
import { CameraPlus } from '@nstudio/nativescript-camera-plus'

import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';

Vue.use(TabsPlugin);

const icons = require('./assets/icons/icons.json')
Vue.prototype.$icons = icons


/* Async Plugins */
Vue.registerElement('HTMLLabel', () => require('@nativescript-community/ui-label').Label);
Vue.registerElement('CameraPlus', () => <any>CameraPlus);

/* Uses */
Vue.use(Navigator, { routes })
Vue.use(Pager)
Vue.use(CollectionView);



/* Configuration */
declare let __DEV__: boolean;
Vue.config.silent = !__DEV__
import store from "./states"


/* Init */
new Vue({
  store,
  render: (h) => h(App)
}).$start()
