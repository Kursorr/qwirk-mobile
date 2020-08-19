<template>
  <Page :actionBarHidden="true">
    <StackLayout ref="left" class="content chat" :marginRight="drawerMargin">
      <GridLayout rows="*" columns="auto, *">
        <Servers />
        <Channels column="1"/>
      </GridLayout>
    </StackLayout>

    <StackLayout ref="right"
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
                 rowSpan="2"
                 colSpan="2"
                 :class="`mainContent content ${onPage ? 'darkerColor' : 'lighterColor'}`">
      <GridLayout rows="*" columns="*">
        <Label fontSize="18"
               verticalAlignment="center"
               textAlignment="center"
               text="👈🏾 slide to the left or slide to the right 👉🏾" />
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import { screen } from '@nativescript/core/platform'
  import { Component, Vue } from 'vue-property-decorator'

  import { animate } from '../animation'

  import Servers from '../components/Servers.js'
  import Channels from '../components/Channels.js'
  import Users from '../components/Users.js'

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
  export default class Tchat extends Vue {
    private isAnimating: boolean = false

    private deltaX: number = 0
    private slideSensitivity: number = 3
    private onPage: string = null

    private leftDrawerSize: number = screen.mainScreen.widthPixels * (1 / 3)
    private rightDrawerSize: number = screen.mainScreen.widthPixels * (1 / 3)
    private drawerMargin: number = (screen.mainScreen.widthPixels * (1 / 7)) / 2

    closeIfOpen () {
      if (this.onPage == null) return
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

    animateTo (direction: string) {
      if (this.isAnimating) return

      this.isAnimating = true

      if (direction == 'left') {
        // @ts-ignore
        this.$refs.left.nativeView.visibility = 'visible'
        // @ts-ignore
        this.$refs.right.nativeView.visibility = 'collapse'
      } else if (direction == 'right') {
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

    checkDirection (delta: number) {
      if (delta > this.leftDrawerSize / 2 && (this.onPage == null || this.onPage == 'right')) {
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
        this.$refs.footer.nativeView.animate({
          translate: {
            x: 0,
            y: 0
          },
          duration: 200
        })
      } else if (delta < (-1 * this.rightDrawerSize) / 2 && (this.onPage == null || this.onPage == 'left')) {
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
        this.$refs.footer.nativeView.animate({
          translate: {
            x: 0,
            y: 100
          },
          duration: 200
        })
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
        this.$refs.footer.nativeView.animate({
          translate: {
            x: 0,
            y: 100
          },
          duration: 200
        })
      }
    }

    displayContent (args) {
      if (args.deltaX < this.slideSensitivity && args.deltaX > -1 * this.slideSensitivity) return

      if (this.onPage != null) args.deltaX += this.deltaX

      if (this.onPage != null || (args.deltaX == 0 || this.deltaX == 0)) {
        // @ts-ignore
        this.$refs.right.nativeView.visibility = 'visible'
        // @ts-ignore
        this.$refs.left.nativeView.visibility = 'visible'
      }

      if (args.deltaX > this.leftDrawerSize / 2) {
        // @ts-ignore
        this.$refs.right.nativeView.visibility = 'collapse'
      } else if (args.deltaX < (-1 * this.rightDrawerSize) / 2) {
        // @ts-ignore
        this.$refs.left.nativeView.visibility = 'collapse'
      }

      // @ts-ignore
      this.$refs.mainContent.nativeView.animate({
        translate: {
          x: args.deltaX,
          y: 0
        },
        duration: 0
      })

      if (args.state == UP) {
        this.checkDirection(args.deltaX)
      }
    }
  }
</script>

<style lang="scss">
  Label {
    color: #FFF;
  }
</style>
