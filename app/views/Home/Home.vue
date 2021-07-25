/**
 * File: Home Screen
 *
 * Date Created: 06192021
 * Date Modified: 06192021
**/

<template>
  <Page actionBarHidden="true" @pan="displayContent">
    <GridLayout :marginTop="currentStatusbar">
      <LeftDrawer ref="left" :touchEvt="channelGesture" />

      <RightDrawer ref="right" />

      <Tchat :keyboards="onPage" ref="mainContent" boxShadow="0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"  @tap="closeIfOpen" :touchEvt="tchatGesture" />

      <StackLayout ref="bottomNav" verticalAlignment="bottom" marginBottom="-65" height="65" backgroundColor="#191c1f">
         <Footer />
      </StackLayout>

    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Screen, CoreTypes } from '@nativescript/core'

/* Utils */
import { animate } from '../../utils/animation'

/* Components */
import LeftDrawer from '@/layouts/Home/LeftDrawer.vue'
import RightDrawer from '@/layouts/Home/RightDrawer.vue'
import Tchat from '@/layouts/Home/CenterChat.vue'
import Footer from '@/layouts/Global/Footer.vue'

/* Constants */
const DOWN = 1
const PANNING = 2
const UP = 3

@Component({
  components: {
    LeftDrawer,
    RightDrawer,
    Tchat,
    Footer
  },
})
export default class Root extends Vue {
  /* Declaration Types */
  $refs!: {
    dat: any
  }

  /* Drawer Size base on layout */
  private leftDrawerSize: number = Screen.mainScreen.widthPixels * 0.332
  private rightDrawerSize: number = Screen.mainScreen.widthPixels * 0.332

  /* Configuration : Slider */
  private slideSensitivity: number = 10
  private isAnimating: boolean = false
  private deltaX: number = 0
  private onPage: string = null
  private tchatGesture: boolean = true
  private channelGesture: boolean = true

  /* Get the height from Vuex */
  get currentStatusbar(): number {
    return this.$store.state.s
  }

  /* Logics */

  closeIfOpen() {
    if (this.onPage === null) return
    if (this.isAnimating) return

    this.isAnimating = true

    animate(500, [
      {
        curve: (v) => Math.sin(v),
        getRange: () => ({
          from: this.deltaX,
          to: 0,
        }),
        step: (v) => {
          this.displayContent({
            deltaX: v,
            state: 3,
          })
        },
      },
    ]).then((v) => {
      this.isAnimating = false
      this.onPage = null
    })
  }

  animateTo(direction: string) {
    if (this.isAnimating) return

    this.isAnimating = true

    if (direction === 'left') {
      this.$refs['left'].nativeView.visibility = 'visible'
      this.$refs['right'].nativeView.visibility = 'collapse'
    } else if (direction === 'right') {
      this.$refs['left'].nativeView.visibility = 'collapse'
      this.$refs['right'].nativeView.visibility = 'visible'
    }

    let destination =
      direction == 'left' ? this.leftDrawerSize : -1 * this.rightDrawerSize

    animate(500, [
      {
        curve: (v) => Math.sin(v),
        getRange: () => ({
          from: this.deltaX,
          to: destination,
        }),
        step: (v) => {
          this.deltaX = v
          this.$refs['mainContent'].nativeView.translateX = v
        },
      },
    ]).then((v) => {
      this.isAnimating = false
    })
  }

  checkDirection(delta: number) {
    if (
      delta > this.leftDrawerSize / 2
    ) {
      this.deltaX = this.leftDrawerSize
      this.onPage = 'left'

      /* Gestures */
      this.tchatGesture = false
      this.channelGesture = true

      /* Adding Opacity */
      this.$store.commit('opacity', '0.7')

      this.$refs['mainContent'].nativeView.animate({
        translate: {
          x: this.deltaX,
          y: 0,
        },
        duration: 200,
      })

    } else if (
      delta < (-1 * this.rightDrawerSize) / 2
    ) {

      this.deltaX = -1 * this.rightDrawerSize
      this.onPage = 'right'

      /* Gestures */
      this.tchatGesture = false

      /* Adding Opacity */
      this.$store.commit('opacity', '0.7')

      this.$refs['mainContent'].nativeView.animate({
        translate: {
          x: this.deltaX,
          y: 0,
        },
        duration: 200,
      })
      this.$refs['bottomNav'].nativeView.animate({
        translate: { x: 0, y: 100 },
        duration: 200,
        curve: CoreTypes.AnimationCurve.easeOut,
      })

    } else {
      this.onPage = null
      this.deltaX = 0

      /* Gestures */
      this.tchatGesture = true
      this.channelGesture = true

      /* Removing Opacity */
      this.$store.commit('opacity', '1')

      this.$refs['mainContent'].nativeView.animate({
        translate: {
          x: 0,
          y: 0,
        },
        duration: 200,
      })
      this.$refs['bottomNav'].nativeView.animate({
        translate: { x: 0, y: 100 },
        duration: 200,
        curve: CoreTypes.AnimationCurve.easeOut,
      })
    }
  }

  displayContent(args) {
    if (
      args.deltaX < this.slideSensitivity &&
      args.deltaX > -1 * this.slideSensitivity
    )
      return

    if (this.onPage !== null) args.deltaX += this.deltaX

    if (this.onPage !== null || args.deltaX === 0 || this.deltaX === 0) {
      this.$refs['right'].nativeView.visibility = 'collapse'
      this.$refs['left'].nativeView.visibility = 'collapse'
    }

    if (args.deltaX > this.leftDrawerSize * 0.05) {
      this.$refs['left'].nativeView.visibility = 'visible'
      this.$refs['bottomNav'].nativeView.animate({
        translate: { x: 0, y: -65 },
        duration: 100,
        curve: CoreTypes.AnimationCurve.easeOut,
      })
    } else if (args.deltaX < (-1 * this.rightDrawerSize) / 100) {
      this.$refs['right'].nativeView.visibility = 'visible'
    }

    /* Gesture */
    this.tchatGesture = false
    this.channelGesture = false

    /* Removing Opacity */
    this.$store.commit('opacity', '1')

    this.$refs['mainContent'].nativeView.animate({
      translate: {
        x: args.deltaX,
        y: 0,
      },
      duration: 0,
    })

    if (args.state === UP) {
      this.checkDirection(args.deltaX)
    }
  }
}
</script>
