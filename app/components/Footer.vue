<template>
  <StackLayout>
    <SVGImage src="~/assets/images/logo.svg"
              class="selected"
              @tap="gotoProfile"
              height="25"
              width="25"/>
  </StackLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Footer extends Vue {
    gotoProfile () {
      // @ts-ignore
      this.$navigator.navigate('/profile', { clearHistory: true })
    }
  }
</script>

<style lang="scss">
  .selected {
    opacity: 0.5;
  }
</style>
