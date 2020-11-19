<template>
  <GridLayout rows="*, auto" columns="*" :class="theme">
    <ContentView row="0">
      <Navigator :defaultRoute="isLoggedIn ? 'home' : 'welcome'"/>
    </ContentView>

    <Footer v-if="$globalState.footer"
            row="1"
            :class="[$globalState.footer ? 'footer' : 'footer without']"/>
  </GridLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

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
    private isLoggedIn: boolean = false
  }
</script>

<style lang="scss">
  @import '../style/variables.scss';

  .darker {
    .footer {
      background-color: $darkerFirst;
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
