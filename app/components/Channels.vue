<template>
  <StackLayout class="server">
    <FlexboxLayout :class="[scrollY > 0 ? 'serverInfo addBorder' : 'serverInfo']">
      <FlexboxLayout alignItems="center">
        <Label text="X" marginRight="5"/>
        <Label :text="server.name" class="serverName"/>
      </FlexboxLayout>

      <Label :text="String.fromCharCode($icons.verticalDots)" class="ico"/>
    </FlexboxLayout>

    <ScrollView @scroll="inScrolling" height="100%">
      <StackLayout>
        <StackLayout class="chan" v-for="category in server.categories">
          <FlexboxLayout alignItems="center" marginBottom="18">
            <Label :text="String.fromCharCode($icons.chevronDown)" class="ico down"/>
            <Label :text="category.title" class="categoryName"/>
          </FlexboxLayout>

          <FlexboxLayout v-for="channels in category.channels" class="channels">
            <Label :text="String.fromCharCode($icons.hashtag)" class="ico hashtag" marginRight="5"/>
            <Label :text="channels.name" class="name"/>
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

    public inScrolling (e) {
      this.scrollY = e.scrollY
    }
  }
</script>

<style lang="scss" scoped>
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
      margin-bottom: 20;
    }

    Label.title {
      font-size: 16;
    }

    .channels {
      align-items: center;
      margin-left: 15;
      margin-bottom: 17;
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
