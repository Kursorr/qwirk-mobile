<template>
  <GridLayout class="tchat" columns="*" rows="auto, *, auto" :class="$globalState.opacity ? 'opacity' : ''">
    <Header :displayBorderRadius="true">
      <FlexboxLayout alignItems="center" slot="left">
        <Icon :icon="$icons.menu" class="menu" />
        <Icon :icon="$icons.hashtag" class="hashtag" />
        <Label text="general" class="title" />
      </FlexboxLayout>
      <FlexboxLayout slot="right" alignItems="center">
        <Icon :icon="$icons.search" class="search" @event="gotoPickers" />
        <Icon :icon="$icons.users" class="users" />
      </FlexboxLayout>
    </Header>

    <ListView row="1" @pan="evt" for="(discussion, index) in discussions" separatorColor="transparent" ref="tchat">
      <v-template>
        <WrapLayout >
          <StackLayout width="20%">
            <Image :src="discussion.avatar" height="55" width="55" borderRadius="50" stretch="aspectFill" />
          </StackLayout>
          <StackLayout width="70%" orientation="horizontal">
            <Label verticalAlignment="top" :text="discussion.pseudo" class="author" />
            <Label verticalAlignment="top" :text="discussion.date" class="time" />
          </StackLayout>
          <Label marginTop="-75" marginLeft="22%" width="70%" :textWrap="true" class="text" :text="discussion.text" />
        </WrapLayout>

      </v-template>
    </ListView>

    <StackLayout row="2" margin="0" padding="0">
      <FlexboxLayout id="sendMessage">
        <FlexboxLayout class="rad">
          <Icon :icon="$icons.camera" class="camera" />
        </FlexboxLayout>

        <FlexboxLayout class="rad" margin="0 10">
          <Icon :icon="$icons.gallery" class="image" />
        </FlexboxLayout>

        <FlexboxLayout class="textfieldsection">
          <TextField hint="Envoyez un message à @quenti77" />
          <Icon :icon="$icons.emote" class="emote" fontSize="20" />
        </FlexboxLayout>
      </FlexboxLayout>
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Tchat extends Vue {
  /* Declaration Types */
  $refs!: {
    dat: any
  };
  private discussions = [
    {
      id: 0,
      avatar: '~/assets/images/avatar.jpeg',
      pseudo: 'Kursorr',
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
    {
      id: 0,
      avatar: "~/assets/images/avatar.jpeg",
      pseudo: "Kursorr",
      date: "Aujourd'hui à 20:58",
      text:
        "A super long text, long that should wrap correctly at the bottom... Let's prey that happen correctly",
    },
  ];

  gotoPickers() {
    this.$navigator.navigate('pickers')
  }
  evt(args) {
    if (args) {
      return args
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.tchat {
  &.opacity {
    opacity: 0.6;
  }

  .textInfos {
    width: 90%;
    padding-right: 10;
  }

  .author {
    margin-right: 7;
    font-size: 16;
  }

  .time {
    font-size: 12;
    margin-top: 2;
    color: $grey;
  }

  .text {
    line-height: 4;
  }

  #sendMessage {
    align-items: center;
    justify-content: space-around;
    padding: 8 5;
    margin: 0;

    FlexboxLayout.rad {
      align-items: center;
      justify-content: center;
      border-radius: 50;
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

    .textfieldsection {
      width: 70%;
      border-radius: 30;
      height: 40;
      align-items: center;
    }
  }
}

.darker {
  Label {
    color: $white;
  }

  .author,
  .text {
    color: $white;
  }

  .time {
    color: $grey;
  }
}
</style>
