import Vue from 'nativescript-vue'

/* Router */
import Navigator from 'nativescript-vue-navigator'
import { routes } from './routes';

/* Components */
import App from './views/App.vue'
import Header from './components/Layout/Global/Header.vue'
import Avatar from './components/Avatar.vue'
import Icon from './components/Icon.vue'

const icons = require('./assets/icons/icons.json');

Vue.component('Header', Header)
Vue.component('Icon', Icon)
Vue.component('Avatar', Avatar)

Vue.prototype.$icons = icons
Vue.prototype.$globalState = new Vue({
  data: {
    footer: false,
    opacity: false
  },
  methods: {
    showFooter() { this.footer = true },
    hideFooter() { this.footer = false },
    addOpacity() { this.opacity = true },
    removeOpacity() { this.opacity = false }
  }
})
/* Uses */
Vue.use(Navigator, { routes });

/* States */
import store from "@/store"

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

new Vue({
  store,
  render: (h) => h(App)
}).$start()
