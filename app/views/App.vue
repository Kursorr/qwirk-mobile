<template>
  <AbsoluteLayout :class="theme">
    <ContentView height="100%" width="100%">
      <Navigator :defaultRoute="isLoggedIn ? 'home' : 'profile'"/>
    </ContentView>

    <Footer v-if="$globalState.footer"
            :top="top"
            class="footer"
            width="100%"/>
  </AbsoluteLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Screen } from '@nativescript/core'

  import Footer from '../components/Footer.vue'
  import { mapGetters } from 'vuex'

  @Component({
    components: {
      Footer
    },
    computed: {
      ...mapGetters({
        theme: 'theme/theme'
      })
    }
  })
  export default class App extends Vue {
    private isLoggedIn: boolean = true
    private top: number = 0

    mounted () {
      this.top = Screen.mainScreen.heightDIPs - 80
    }
  }
</script>
