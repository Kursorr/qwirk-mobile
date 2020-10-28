<template>
  <StackLayout class="tchat" :class="$globalState.opacity ? 'opacity' : ''">
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

    <ScrollView>
      <StackLayout marginTop="5">

        <StackLayout margin="5 0">
          <FlexboxLayout justifyContent="center">
            <StackLayout height="40" width="80">
              <Image src="~/assets/images/avatar.jpeg"
                     height="40"
                     width="40"
                     borderRadius="25"
                     stretch="aspectFill"/>
            </StackLayout>

            <StackLayout class="textInfos">
              <FlexboxLayout alignItems="center">
                <Label text="Kursorr" class="author"/>
                <Label text="Aujourd'hui à 20:58" class="time"/>
              </FlexboxLayout>
              <Label :textWrap="true"
                     class="text"
                     text="A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly"/>
            </StackLayout>

          </FlexboxLayout>
        </StackLayout>

      </StackLayout>

    </ScrollView>
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

    .textInfos {
      width: 90%;
      padding-right: 10;

      .author {
        margin-right: 7;
        font-size: 16;
      }

      .time {
        font-size: 11;
        margin-bottom: 2;
        align-self: flex-end;
      }
    }

  }
</style>
