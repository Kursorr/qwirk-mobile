import App from '../views/App.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Friends from '../views/Friends.vue'

export const routes = {
  app: {
    component: App
  },
  home: {
    component: Home
  },
  profile: {
    component: Profile,
    meta: { title: 'Profile' }
  },
  friends: {
    component: Friends
  }
}
