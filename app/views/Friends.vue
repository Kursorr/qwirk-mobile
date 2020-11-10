<template>
  <Page :actionBarHidden="true">
    <GridLayout id="friends"
                columns="*"
                rows="auto, *, auto">
      <Header>
        <FlexboxLayout alignItems="center" slot="left">
          <Label text="Amis"
                 class="title"/>
        </FlexboxLayout>

        <FlexboxLayout alignItems="center" slot="right">
          <Icon :icon="$icons.addFriend" class="addFriend"/>
          <Icon :icon="$icons.addConv" class="addConv" marginLeft="30"/>
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
  @import '../style/variables';

  .darker {
    #friends {
      background-color: $darkerLight;

      Label {
        color: $white;
      }

      .addFriend, .addConv {
        color: $white;
      }
    }
  }


</style>
