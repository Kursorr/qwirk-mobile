<template>
  <StackLayout class="server">
    <FlexboxLayout padding="15 20 15 10" justifyContent="space-between" alignItems="center">
      <FlexboxLayout alignItems="center">
        <Label text="X" marginRight="5"/>
        <Label :text="server.name" class="serverName"/>
      </FlexboxLayout>

      <Label :text="String.fromCharCode($icons.verticalDots)" class="ico"/>
    </FlexboxLayout>

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
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Channels extends Vue {
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
        }
      ]
    }
  }
</script>

<style lang="scss" scoped>
  StackLayout.server {
    border-top-right-radius: 10;

    .chan {
      margin-bottom: 20;
    }

    Label.title {
      font-size: 16;
    }

    .channels {
      align-items: center;
      margin-left: 15;
      margin-bottom: 14;
    }

    &.serverName {
      font-weight: 500;
    }

    .categoryName {
      font-size: 12;
      text-transform: uppercase;
    }

    .name {
      font-size: 12;
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
