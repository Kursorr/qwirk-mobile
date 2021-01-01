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

  import Footer from '../components/Layout/Global/Footer.vue'
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

<style lang="scss">
  .darker {
    .footer {
      background-color: #1C1E22;
    }
  }

  .lighter {
    .footer {
      background-color: red;
    }
  }

  .footer {
    transform: translateY(0);

    .without {
      transform: translateY(100);
    }
  }
</style>
