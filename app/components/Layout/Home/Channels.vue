<template>
  <StackLayout class="server">
    <FlexboxLayout :class="[scrollY > 0 ? 'serverInfo addBorder' : 'serverInfo']">
      <FlexboxLayout alignItems="center">
        <Label text="X" marginRight="5"/>
        <Label :text="server.name" class="serverName"/>
      </FlexboxLayout>

      <Label :text="String.fromCharCode($icons.verticalDots)" class="ico"/>
    </FlexboxLayout>

    <ScrollView @scroll="inScrolling" height="100%" :scrollBarIndicatorVisible="false">
      <StackLayout>
        <StackLayout class="chan" v-for="category in server.categories">
          <FlexboxLayout alignItems="center" marginBottom="10">
            <Label :text="String.fromCharCode($icons.chevronDown)" class="ico down"/>
            <Label :text="category.title" class="categoryName"/>
          </FlexboxLayout>

          <FlexboxLayout v-for="(channel, index) in category.channels"
                         @tap="onSelectChannel(channel, index)"
                         :class="[currentChannelId === index && currentChannelName === channel.name
                          ? 'channels selected' : 'channels']">
            <Label :text="String.fromCharCode($icons.hashtag)" class="ico hashtag" marginRight="5"/>
            <Label :text="channel.name" class="name"/>
          </FlexboxLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </StackLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Channels extends Vue {
    private scrollY = 0
    private server = {
      name: 'La bande à ExSou',
      categories: [
        {
          id: 0,
          title: "jeux vidéos",
          channels: [
            {
              id: 0,
              name: 'among-us'
            },
            {
              id: 1,
              name: 'sekiro'
            },
            {
              id: 2,
              name: 'dark-souls-III'
            }
          ]
        },
        {
          id: 1,
          title: "la zone 42",
          channels: [
            {
              id: 0,
              name: 'dev-informatique'
            },
            {
              id: 1,
              name: 'hardware'
            }
          ]
        },
        {
          id: 1,
          title: "la zone 42",
          channels: [
            {
              id: 0,
              name: 'dev-informatique'
            },
            {
              id: 1,
              name: 'hardware'
            }
          ]
        },
        {
          id: 1,
          title: "la zone 42",
          channels: [
            {
              id: 0,
              name: 'dev-informatique'
            },
            {
              id: 1,
              name: 'hardware'
            }
          ]
        },
        {
          id: 1,
          title: "la zone 42",
          channels: [
            {
              id: 0,
              name: 'dev-informatique'
            },
            {
              id: 1,
              name: 'hardware'
            }
          ]
        },
        {
          id: 1,
          title: "la zone 42",
          channels: [
            {
              id: 0,
              name: 'dev-informatique'
            },
            {
              id: 1,
              name: 'hardware'
            }
          ]
        }
      ]
    }

    private currentChannelId = this.server.categories[0].channels[1].id
    private currentChannelName = this.server.categories[0].channels[1].name

    public inScrolling (e) {
      this.scrollY = e.scrollY
    }

    public onSelectChannel (channel, index) {
      this.currentChannelId = index
      this.currentChannelName = channel.name

      this.$emit('onChannelChange')
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../style/variables';

  .darker {
    .server {
      background-color: #2F3136;

      .serverInfo {
        border-color: $darkerFirst;
      }

      .channels {
        &.selected {
          background-color: rgba(79, 84, 92, 0.32);
          color: #FFF;
        }
      }

      Label {
        color: $white;

        &.categoryName, &.hashtag, &.name, &.down {
          color: $grey;
        }
      }

      .channels.selected {
        Label {
          color: $white;
        }
      }
    }
  }

  .lighter {
    .server {
      background-color: $white;
    }
  }

  StackLayout.server {
    border-top-right-radius: 10;

    .serverInfo {
      justify-content: space-between;
      align-items: center;
      padding: 18 20 18 10;

      &.addBorder {
        border-bottom-width: 0.5;
      }
    }

    .chan {
      margin-bottom: 15;
    }

    Label.title {
      font-size: 16;
    }

    .channels {
      align-items: center;
      margin: 0 10 5 8;
      padding: 10 0 10 7;

      &.selected {
        border-radius: 4;
      }
    }

    &.serverName {
      font-size: 16;
      font-weight: 500;
    }

    .categoryName {
      font-size: 14;
      text-transform: uppercase;
    }

    .name {
      font-size: 14;
    }

    .ico.hashtag {
      font-size: 11;
    }

    .ico.down {
      font-size: 11;
      margin:0 2;
    }
  }
</style>
