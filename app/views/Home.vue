<template>
  <Page :actionBarHidden="true">
    <GridLayout backgroundColor="#202225">
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
          <Tchat row="0" col="0"/>
        </GridLayout>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { screen } from '@nativescript/core/platform'
  import { Component, Vue } from 'vue-property-decorator'

  import { animate } from '../animation'

  import Servers from '@/components/Servers.vue'
  import Channels from '@/components/Channels.vue'
  import Users from '@/components/Users.vue'
  import Tchat from '@/components/Tchat.vue'

  import { mapActions } from 'vuex'

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
    methods: {
      ...mapActions({
        sfooter: 'layout/sfooter'
      })
    }
  })
  export default class Home extends Vue {
    private isAnimating: boolean = false

    private deltaX: number = 0
    private slideSensitivity: number = 3
    private onPage: string = null

    private leftDrawerSize: number = screen.mainScreen.widthPixels * (1 / 3)
    private rightDrawerSize: number = screen.mainScreen.widthPixels * (1 / 3)
    private drawerMargin: number = (screen.mainScreen.widthPixels * (1 / 9)) / 2

    closeIfOpen () {
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

    animateTo (direction: string) {
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

    checkDirection (delta: number) {
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
        this.sfooter(true)
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
        this.sfooter(false)
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
        this.sfooter(false)
      }
    }

    displayContent (args) {
      if (args.deltaX < this.slideSensitivity && args.deltaX > -1 * this.slideSensitivity) return

      if (this.onPage !== null) args.deltaX += this.deltaX

      if (this.onPage !== null || (args.deltaX === 0 || this.deltaX === 0)) {
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

      if (args.state === UP) {
        this.checkDirection(args.deltaX)
      }
    }

  }
</script>

<style lang="scss">
  @import '../style/variables.scss';

  .mainContent {
    border-top-left-radius: 10;
    border-top-right-radius: 10;
  }

  .content {
    &.darkerColor {
      background-color: $darkerThird;
    }

    &.lighterColor {
      background-color: $darkerLight;
    }
  }

  .chat,
  .serversList {
    background-color: $darkerSecond;
  }
</style>
