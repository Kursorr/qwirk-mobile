<template>
  <AbsoluteLayout>
    <ContentView height="100%" width="100%">
      <Navigator :defaultRoute="isLoggedIn ? 'home' : 'testParallax'" />
    </ContentView>

    <Footer ref="footer" :top="top" class="footer" width="100%" />
  </AbsoluteLayout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Screen, CoreTypes } from '@nativescript/core'

import Footer from '../components/Layout/Global/Footer.vue'
import Theme from '@nativescript/theme'

@Component({
  components: {
    Footer,
  },
})
export default class App extends Vue {
  /* Declaration Types */
  $refs!: {
    dat: any
  }

  private isLoggedIn: boolean = true
  private top: number = 0

  /* Animation */
  @Watch('$globalState.footer')
  onChildChanged(val: boolean) {
    if (val) {
      this.top = Screen.mainScreen.heightDIPs - 80
      this.$refs['footer'].nativeView.animate({
        translate: { x: 0, y: 20 },
        duration: 350,
        curve: CoreTypes.AnimationCurve.easeOut,
      })
    } else {
      this.$refs['footer'].nativeView.animate({
        translate: { x: 0, y: 100 },
        duration: 300,
        curve: CoreTypes.AnimationCurve.easeOut,
      })
    }
  }

  mounted() {
    this.top = Screen.mainScreen.heightDIPs - 0
    Theme.toggleMode(true)
  }
}
</script>

<style lang="scss">
.footer {
  transform: translateY(0);

  .without {
    transform: translateY(100);
  }
}
</style>
