<template>
  <StackLayout class="tchat" :class="$globalState.removeOpacity ? 'opacity' : ''">
    <FlexboxLayout class="headerSection">
      <FlexboxLayout class="header">
        <FlexboxLayout alignItems="center">
          <Label :text="String.fromCharCode($icons.menu)"
                 class="ico menu"/>
          <Label :text="String.fromCharCode($icons.hashtag)"
                 class="ico hashtag"/>
          <Label text="general"
                 class="title"/>
        </FlexboxLayout>
        <FlexboxLayout>
          <Label :text="String.fromCharCode($icons.search)"
                 class="ico search"/>
          <Label :text="String.fromCharCode($icons.users)"
                 class="ico users"/>
        </FlexboxLayout>
      </FlexboxLayout>
    </FlexboxLayout>

    <Label text="OK ! :)"/>
  </StackLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Tchat extends Vue {}
</script>

<style lang="scss" scoped>
  .tchat {
    &.opacity {
      opacity: 0.6;
    }

    .header {
      padding: 15 0;
      margin: 0 20;
      width: 100%;
      justify-content: space-between;

      Label {
        font-size: 18;

        &.menu {
          margin-right: 20;
        }

        &.hashtag {
          margin-right: 5;
        }

        &.search {
          margin-right: 30;
        }
      }
    }
  }
</style>
