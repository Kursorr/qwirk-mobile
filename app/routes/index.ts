/**
 * File: Navigation Routes
 *
 * Date Created: 06192021
 * Date Modified: 06192021
**/

/* Screens */
import Home from '../views/Home/Home.vue'
import CameraView from '../layouts/Camera/CameraView.vue'

export const routes: object = {
  '/home': {
    component: Home,
  },
  '/camera': {
    component: CameraView,
  }
}
