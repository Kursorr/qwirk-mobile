import Vue from 'nativescript-vue'
import Copilot from '@nativescript-copilot/vue'
import Navigator from 'nativescript-vue-navigator'
import * as orientation from 'nativescript-screen-orientation'

import VueDevtools from 'nativescript-vue-devtools'

import App from './views/App.vue'
import Header from './components/Layout/Header.vue'

import { routes } from './routes/'
import store from './store/'

require('./app.scss')
const icons = require('./assets/icons/icons.json')

Vue.component('Header', Header)

Vue.use(Copilot)
Vue.use(Navigator, { routes })

if (TNS_ENV !== 'production')
  Vue.use(VueDevtools)

Vue.prototype.$orientation = orientation
Vue.prototype.$icons = icons
Vue.prototype.$globalState = new Vue({
  data: {
    footer: false,
    opacity: false
  },
  methods: {
    showFooter () { this.footer = true },
    hideFooter () { this.footer = false },
    addOpacity () { this.opacity = true },
    removeOpacity () { this.opacity = false }
  }
})

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: (h) => h(App)
}).$start()
