<template>
  <Navigator :defaultRoute="isLoggedIn ? '/app' : '/profile'"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
  private isLoggedIn: boolean = true
}
</script>
