<template>
  <Page :actionBarHidden="true">
    <StackLayout class="profileSection">
      <Label text="Profile view ! :) OK"/>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Profile extends Vue {}
</script>

<style lang="scss" scoped>
  @import '../style/variables.scss';

  .darker {
    .profileSection {
      background-color: $darkerFirst;

      Label {
        color: $white;
      }
    }
  }
</style>
