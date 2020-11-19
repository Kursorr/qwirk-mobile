import App from '../views/App.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Friends from '../views/Friends.vue'
import Editor from '../views/Editor.vue'
import Welcome from '../views/Welcome.vue'
import TestMultiplePicker from '../components/TestMultiplePicker.vue'

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
  },
  editor: {
    component: Editor
  },
  welcome: {
    component: Welcome
  },
  pickers: {
    component: TestMultiplePicker
  }
}
