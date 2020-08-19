<template>
  <GridLayout rows="*, auto" columns="*">
    <ContentView row="0">
      <Navigator :defaultRoute="isLoggedIn ? 'tchat' : 'profile'"/>
    </ContentView>

    <Footer v-if="gfooter"
            row="1"
            :class="[gfooter ? 'footer' : 'footer without']"/>
  </GridLayout>
</template>

<script lang="ts">
  import { Component, Watch, Vue } from 'vue-property-decorator'

  import Footer from '../components/Footer.vue'
  import { mapGetters } from 'vuex'

  @Component({
    components: {
      Footer
    },
    computed: {
      ...mapGetters({
        gfooter: 'layout/gfooter'
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
  background-color: $darkerFirst;
  padding: 15 0;

  .without {
    transform: translateY(100);
  }
}
</style>
