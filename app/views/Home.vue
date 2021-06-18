<template>
  <Page :actionBarHidden="true" marginTop="35" androidStatusBarBackground="#1F2225" @pan="displayContent">
    <GridLayout rows="*" columns="*" class="background" @swipe="onSwipe($event)">
      <WrapLayout ref="left" class="chat background"  marginRight="10" width="90%" padding="0">

        <Servers width="70" paddingTop="10" column="0" row="0" class="serverlist" />
        <Channels width="75%" class="channellist" column="1" row="0" @onChannelChange="channelChange" />

      </WrapLayout>

      <WrapLayout ref="right" class="background" horizontalAlignment="right" width="91%"  marginTop="-9" borderTopLeftRadius="10" padding="0">
        <Label marginLeft="10" padding="10"  class="content-header" height="50" width="100%" borderTopLeftRadius="10" fontSize="20" marginTop="10" fontWeight="bold" text="🔔 Notifications" />
        <Users marginLeft="10" height="100%" class="content" />
      </WrapLayout>

      <WrapLayout  @tap="closeIfOpen" ref="mainContent" margin="0" padding="0" rowSpan="2" colSpan="2" class="mainContent content">
        <GridLayout rows="*" columns="*">
          <Tchat row="0" col="0" />
        </GridLayout>
      </WrapLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { Screen } from '@nativescript/core/platform'
import { Component, Vue } from 'vue-property-decorator'

import { animate } from '@/animation'

import Servers from '@/components/Layout/Home/Servers.vue'
import Channels from '@/components/Layout/Home/Channels.vue'
import Users from '@/components/Layout/Home/Users.vue'
import Tchat from '@/components/Layout/Home/Tchat.vue'

import { SwipeDirection } from '@nativescript/core'

const DOWN = 1
const PANNING = 2
const UP = 3

@Component({
  components: {
    Servers,
    Channels,
    Users,
    Tchat,
  },
})
export default class Home extends Vue {
  /* Declaration Types */
  $refs!: {
    dat: any
  }

  private isAnimating: boolean = false

  private deltaX: number = 0
  private slideSensitivity: number = 30
  private onPage: string = null

  private leftDrawerSize: number = Screen.mainScreen.widthPixels * (1 / 3)
  private rightDrawerSize: number = Screen.mainScreen.widthPixels * (1 / 3)
  private drawerMargin: number =
    (Screen.mainScreen.widthPixels * (1 / 9)) / 2.5

  public channelChange() {
    this.onPage = null
    this.deltaX = 0

    this.$refs['mainContent'].nativeView.animate({
      translate: {
        x: 0,
        y: 0,
      },
      duration: 200,
    })

    this.$globalState.hideFooter()

    this.$globalState.removeOpacity()
  }

  public closeIfOpen() {
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

  public animateTo(direction: string) {
    if (this.isAnimating) return

    this.isAnimating = true

    if (direction === 'left') {
      this.$refs['left'].nativeView.visibility = 'visible'

      this.$refs['right'].nativeView.visibility = 'collapse'
    } else if (direction === 'right') {
      this.$refs['left'].nativeView.visibility = 'collapse'

      this.$refs['right'].nativeView.visibility = 'visible'
    }

    const destination =
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

  public checkDirection(delta: number) {
    if (
      delta > this.leftDrawerSize / 2 &&
      (this.onPage === null || this.onPage === 'right')
    ) {
      this.deltaX = this.leftDrawerSize
      this.onPage = 'left'

      this.$refs['mainContent'].nativeView.animate({
        translate: {
          x: this.deltaX,
          y: 0,
        },
        duration: 200,
      })

      this.$globalState.showFooter()

      this.$globalState.addOpacity()
    } else if (
      delta < (-1 * this.rightDrawerSize) / 2 &&
      (this.onPage === null || this.onPage === 'left')
    ) {
      this.deltaX = -1 * this.rightDrawerSize
      this.onPage = 'right'

      this.$refs['mainContent'].nativeView.animate({
        translate: {
          x: this.deltaX,
          y: 0,
        },
        duration: 200,
      })

      this.$globalState.hideFooter()

      this.$globalState.addOpacity()
    } else {
      this.onPage = null
      this.deltaX = 0

      this.$refs['mainContent'].nativeView.animate({
        translate: {
          x: 0,
          y: 0,
        },
        duration: 200,
      })

      this.$globalState.hideFooter()

      this.$globalState.removeOpacity()
    }
  }

  public displayContent(args) {
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

    if (args.deltaX > this.leftDrawerSize / 100) {
      this.$refs['left'].nativeView.visibility = 'visible'
    } else if (args.deltaX < (-1 * this.rightDrawerSize) / 100) {
      this.$refs['right'].nativeView.visibility = 'visible'
    }

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

  /* Swiper */
  onSwipe(args: any) {
    let direction = args.direction == SwipeDirection.left ? 'left' : 'right'
    console.log(direction)
  }
  /*
    @navigatingTo='navigatingTo'
    navigatingTo () {
      this.animateTo('left')
      this.onPage = 'left'


      this.$globalState.showFooter()
    }*/
}
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";

.mainContent {
  border-top-left-radius: 15;
  border-top-right-radius: 15;
}

// .darker {
//   .content {
//     &.darkerColor {
//       background-color: $darkerThird;
//     }

//     &.lighterColor {
//       background-color: $darkerLight;
//     }
//   }

//   .serversList {
//     // background-color: $darkerSecond;
//   }
// }
</style>
