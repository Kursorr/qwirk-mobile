<template>
  <Page :actionBarHidden="true">
    <GridLayout backgroundColor="#202225">
      <StackLayout ref="left"
                   class="content chat"
                   :marginRight="drawerMargin"
                   margin="0"
                   padding="0">
        <GridLayout rows="*" columns="auto, 280" padding="0" margin="0">
          <Servers />
          <Channels column="1" row="0" @onChannelChange="channelChange"/>
        </GridLayout>
      </StackLayout>

      <StackLayout ref="right"
                   width="380"
                   rowSpan="2"
                   col="1"
                   class="content serversList"
                   :marginLeft="drawerMargin"
                   borderRadius="10">
        <Users />
      </StackLayout>

      <StackLayout @pan="displayContent"
                   @tap="closeIfOpen"
                   ref="mainContent"
                   margin="0"
                   padding="0"
                   rowSpan="2"
                   colSpan="2"
                   :class="`mainContent content ${onPage ? 'darkerColor' : 'lighterColor'}`">
        <GridLayout rows="*" columns="*">
          <Tchat row="0" col="0"/>
        </GridLayout>
      </StackLayout>
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

  const DOWN = 1
  const PANNING = 2
  const UP = 3

  @Component({
    components: {
      Servers,
      Channels,
      Users,
      Tchat
    }
  })
  export default class Home extends Vue {
    private isAnimating: boolean = false

    private deltaX: number = 0
    private slideSensitivity: number = 3
    private onPage: string = null

    private leftDrawerSize: number = Screen.mainScreen.widthPixels * (1 / 3)
    private rightDrawerSize: number = Screen.mainScreen.widthPixels * (1 / 3)
    private drawerMargin: number = (Screen.mainScreen.widthPixels * (1 / 9)) / 2

    public channelChange () {
      this.onPage = null
      this.deltaX = 0

      // @ts-ignore
      this.$refs.mainContent.nativeView.animate({
        translate: {
          x: 0,
          y: 0
        },
        duration: 200
      })

      // @ts-ignore
      this.$globalState.hideFooter()
      // @ts-ignore
      this.$globalState.removeOpacity()
    }

    public closeIfOpen () {
      if (this.onPage === null) return
      if (this.isAnimating) return

      this.isAnimating = true

      animate(500, [{
        curve: v => Math.sin(v),
        getRange: () => ({
          from: this.deltaX,
          to: 0
        }),
        step: v => {
          this.displayContent({
            deltaX: v,
            state: 3
          })
        }
      }]).then(v => {
        this.isAnimating = false
        this.onPage = null
      })
    }

    public animateTo (direction: string) {
      if (this.isAnimating) return

      this.isAnimating = true

      if (direction === 'left') {
        // @ts-ignore
        this.$refs.left.nativeView.visibility = 'visible'
        // @ts-ignore
        this.$refs.right.nativeView.visibility = 'collapse'
      } else if (direction === 'right') {
        // @ts-ignore
        this.$refs.left.nativeView.visibility = 'collapse'
        // @ts-ignore
        this.$refs.right.nativeView.visibility = 'visible'
      }

      const destination = direction == 'left' ? this.leftDrawerSize : -1 * this.rightDrawerSize

      animate(500, [{
        curve: v => Math.sin(v),
        getRange: () => ({
          from: this.deltaX,
          to: destination
        }),
        step: v => {
          this.deltaX = v
          // @ts-ignore
          this.$refs.mainContent.nativeView.translateX = v
        }
      }]).then(v => {
        this.isAnimating = false
      })
    }

    public checkDirection (delta: number) {
      if (delta > this.leftDrawerSize / 2 && (this.onPage === null || this.onPage === 'right')) {
        this.deltaX = this.leftDrawerSize
        this.onPage = 'left'

        // @ts-ignore
        this.$refs.mainContent.nativeView.animate({
          translate: {
            x: this.deltaX,
            y: 0
          },
          duration: 200
        })

        // @ts-ignore
        this.$globalState.showFooter()
        // @ts-ignore
        this.$globalState.addOpacity()
      } else if (delta < (-1 * this.rightDrawerSize) / 2 && (this.onPage === null || this.onPage === 'left')) {
        this.deltaX = -1 * this.rightDrawerSize
        this.onPage = 'right'

        // @ts-ignore
        this.$refs.mainContent.nativeView.animate({
          translate: {
            x: this.deltaX,
            y: 0
          },
          duration: 200
        })

        // @ts-ignore
        this.$globalState.hideFooter()
        // @ts-ignore
        this.$globalState.addOpacity()
      } else {
        this.onPage = null
        this.deltaX = 0

        // @ts-ignore
        this.$refs.mainContent.nativeView.animate({
          translate: {
            x: 0,
            y: 0
          },
          duration: 200
        })

        // @ts-ignore
        this.$globalState.hideFooter()
        // @ts-ignore
        this.$globalState.removeOpacity()
      }
    }

    public displayContent (args) {
      if (args.deltaX < this.slideSensitivity && args.deltaX > -1 * this.slideSensitivity) return

      if (this.onPage !== null) args.deltaX += this.deltaX

      if (this.onPage !== null || (args.deltaX === 0 || this.deltaX === 0)) {
        // @ts-ignore
        this.$refs.right.nativeView.visibility = 'collapse'
        // @ts-ignore
        this.$refs.left.nativeView.visibility = 'collapse'
      }

      if (args.deltaX > this.leftDrawerSize / 100) {
        // @ts-ignore
        this.$refs.left.nativeView.visibility = 'visible'
      } else if (args.deltaX < (-1 * this.rightDrawerSize) / 100) {
        // @ts-ignore
        this.$refs.right.nativeView.visibility = 'visible'
      }

      // @ts-ignore
      this.$refs.mainContent.nativeView.animate({
        translate: {
          x: args.deltaX,
          y: 0
        },
        duration: 0
      })

      if (args.state === UP) {
        this.checkDirection(args.deltaX)
      }
    }

    /*
    @navigatingTo="navigatingTo"
    navigatingTo () {
      this.animateTo('left')
      this.onPage = 'left'

      // @ts-ignore
      this.$globalState.showFooter()
    }*/
  }
</script>

<style lang="scss" scoped>
  @import '../style/variables.scss';

  .mainContent {
    border-top-left-radius: 10;
    border-top-right-radius: 10;
  }

  .darker {
    .content {
      &.darkerColor {
        background-color: $darkerThird;
      }

      &.lighterColor {
        background-color: $darkerLight;
      }
    }

    .serversList {
      background-color: $darkerSecond;
    }
  }
</style>
