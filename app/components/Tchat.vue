<template>
  <GridLayout class="tchat"
              columns="*"
              rows="auto, *, auto"
              :class="$globalState.opacity ? 'opacity' : ''">
    <FlexboxLayout class="headerSection" row="0">
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

    <ScrollView row="1">
      <StackLayout marginTop="5">

        <StackLayout margin="5 0" v-for="(discussion, index) in discussions">
          <FlexboxLayout justifyContent="center">
            <StackLayout height="40" width="80">
              <Image :src="discussion.avatar"
                     height="40"
                     width="40"
                     borderRadius="25"
                     stretch="aspectFill"/>
            </StackLayout>

            <StackLayout class="textInfos">
              <FlexboxLayout alignItems="center">
                <Label :text="discussion.pseudo" class="author"/>
                <Label :text="discussion.date" class="time"/>
              </FlexboxLayout>
              <Label :textWrap="true"
                     class="text"
                     :text="discussion.text"/>
            </StackLayout>

          </FlexboxLayout>
        </StackLayout>

      </StackLayout>

    </ScrollView>

    <StackLayout row="2">
      <Label textWrap="true"
             :text="String.fromCharCode($icons.camera)"
             class="ico camera"
             color="#FFF"/>
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Tchat extends Vue {
    private discussions = [
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      }
    ]
  }
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
