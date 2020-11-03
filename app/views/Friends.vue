<template>
  <Page :actionBarHidden="true">
    <GridLayout id="friends"
                columns="*"
                rows="auto, *, auto">
      <Header>
        <FlexboxLayout alignItems="center" slot="left">
          <Label :text="String.fromCharCode($icons.addFriend)"
                 class="ico"/>
          <Label :text="String.fromCharCode($icons.addConv)"
                 class="ico"/>
          <Label :text="String.fromCharCode($icons.call)"
                 class="ico"/>
          <Label :text="String.fromCharCode($icons.conv)"
                 class="ico"/>
          <Label text="Friends"
                 class="title"/>
        </FlexboxLayout>

        <FlexboxLayout alignItems="center" slot="right">
          <Label :text="String.fromCharCode($icons.addFriend)"
                 class="ico"/>
          <Label :text="String.fromCharCode($icons.addConv)"
                 class="ico"/>
          <Label :text="String.fromCharCode($icons.call)"
                 class="ico"/>
          <Label :text="String.fromCharCode($icons.conv)"
                 class="ico"/>
        </FlexboxLayout>
      </Header>


    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Friends extends Vue {}
</script>

<style lang="scss" scoped>

</style>
