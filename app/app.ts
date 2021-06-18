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

/* Uses */
Vue.use(Navigator, { routes })

/* Plugins */


/* Async Plugins */


/* Configuration */
declare let __DEV__: boolean;
Vue.config.silent = !__DEV__
import store from "./states"

/* Init */
new Vue({
  store,
  render: (h) => h(App)
}).$start()
