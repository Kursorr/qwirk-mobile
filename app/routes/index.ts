import App from '../views/App.vue'
import Tchat from '../views/Tchat.vue'
import Profile from '../views/Profile.vue'
import Friends from '../views/Friends.vue'

export const routes = {
  app: {
    component: App
  },
  tchat: {
    component: Tchat
  },
  profile: {
    component: Profile,
    meta: { title: 'Profile' }
  },
  friends: {
    component: Friends
  }
}
