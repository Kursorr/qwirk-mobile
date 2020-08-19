<template>
  <Page :actionBarHidden="true">
    <StackLayout>
      <Label text="Profile view ! :) OK"/>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Profile extends Vue {
    created () {
      // @ts-ignore
      console.log(this.$mustShowFooter)
    }
  }
</script>

<style lang="scss" scoped>
  StackLayout {
    background-color: #1C1E22;
  }

  Label {
    color: #FFF;
  }
</style>
