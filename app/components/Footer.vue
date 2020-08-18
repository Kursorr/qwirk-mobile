<template>
  <StackLayout>
    <SVGImage src="~/assets/images/logo.svg"
              class="selected"
              height="25"
              width="25"/>
  </StackLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Footer extends Vue {
  }
</script>

<style lang="scss">
  .selected {
    opacity: 0.5;
  }
</style>
