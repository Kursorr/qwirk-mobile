<template>
  <Page :actionBarHidden="true">
    <StackLayout class="friendsSection">
      <Label text="Friends view ! :) OK"/>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Friends extends Vue {}
</script>

<style lang="scss" scoped>
</style>
