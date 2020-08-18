import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'

import App from './views/App.vue'
import store from './store'

Vue.registerElement('SVGImage', () => require('@teammaestro/nativescript-svg').SVGImage)

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
