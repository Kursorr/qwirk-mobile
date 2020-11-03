<template>
  <StackLayout>
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

      <ListView row="1"
                for="(discussion, index) in discussions"
                separatorColor="transparent">
        <v-template>
          <StackLayout>
            <FlexboxLayout justifyContent="center" margin="5 0">
              <StackLayout height="40" width="80">
                <Image :src="discussion.avatar"
                       height="40"
                       width="40"
                       borderRadius="20"
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
        </v-template>
      </ListView>

      <StackLayout row="2">
        <FlexboxLayout id="tchat">
          <FlexboxLayout class="rad">
            <Label textWrap="true"
                   :text="String.fromCharCode($icons.camera)"
                   class="ico camera"
                   color="#FFF"/>
          </FlexboxLayout>

          <FlexboxLayout class="rad" margin="0 10">
            <Label textWrap="true"
                   :text="String.fromCharCode($icons.gallery)"
                   class="ico camera"
                   color="#FFF"/>
          </FlexboxLayout>

          <FlexboxLayout class="textfieldsection">
            <TextField hint="Envoyez un message à @quenti77"/>

            <Label textWrap="true"
                   :text="String.fromCharCode($icons.emote)"
                   class="ico camera"
                   fontSize="20"
                   color="#FFF"/>
          </FlexboxLayout>
        </FlexboxLayout>
      </StackLayout>
    </GridLayout>
  </StackLayout>
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
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'Kursorr',
        date: 'Aujourd\'hui à 20:58',
        text: 'A super long text, long that should wrap correctly at the bottom... Let\'s prey that happen correctly'
      },
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

    #tchat {
      align-items: center;
      justify-content: space-around;
      padding: 8 15;

      FlexboxLayout.rad {
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: #2F3136;
        height: 40;
        width: 40;

        Label {
          font-size: 20;
        }
      }

      TextField {
        font-size: 14;
        padding: 0 10;
        margin: 0;
        width: 88%;
        border-width: 0 0 1 0;
      }
    }
  }
</style>
