<template>
  <Navigator :defaultRoute="isLoggedIn ? '/main' : '/profile'"/>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class App extends Vue {
    private isLoggedIn: boolean = true
  }
</script>
