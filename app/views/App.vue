<template>
  <GridLayout rows="*, auto" columns="*" :class="theme">
    <ContentView row="0">
      <Navigator :defaultRoute="isLoggedIn ? 'home' : 'profile'"/>
    </ContentView>

    <Footer v-if="gfooter"
            row="1"
            :class="[gfooter ? 'footer' : 'footer without']"/>
  </GridLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  import Footer from '../components/Footer.vue'
  import { mapGetters } from 'vuex'

  @Component({
    components: {
      Footer
    },
    computed: {
      ...mapGetters({
        gfooter: 'layout/gfooter',
        theme: 'theme/theme'
      })
    }
  })
  export default class App extends Vue {
    private isLoggedIn: boolean = true
  }
</script>

<style lang="scss">
  @import '../style/variables.scss';

  .footer {
    transform: translateY(0);

    .without {
      transform: translateY(100);
    }
  }
</style>
