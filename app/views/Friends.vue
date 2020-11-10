<template>
  <Page :actionBarHidden="true">
    <GridLayout id="friends"
                columns="*"
                rows="auto, *">
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

      <StackLayout row="1">
        <Label text="en ligne - 3" class="section"/>

        <ListView for="(friend, index) in friends"
                  separatorColor="transparent">
          <v-template>
            <FlexboxLayout alignItems="center" padding="15 20">
              <Avatar size="medium"/>
              <FlexboxLayout class="pseudoAndStatus">
                <Label class="pseudo" text="quenti77"/>
                <Label class="statusTextDetail" text="Ne pas déranger"/>
              </FlexboxLayout>
              <FlexboxLayout>
                <Icon :icon="$icons.call" class="call"/>
                <Icon :icon="$icons.conv" class="conv" marginLeft="38"/>
              </FlexboxLayout>
            </FlexboxLayout>
          </v-template>
        </ListView>

        <Label text="hors ligne - 4" class="section"/>

        <ListView for="(friend, index) in friends"
                  separatorColor="transparent">
          <v-template>
            <FlexboxLayout alignItems="center" padding="15 20">
              <Avatar size="medium"/>
              <FlexboxLayout class="pseudoAndStatus">
                <Label class="pseudo" text="Abstrakts"/>
                <Label class="statusTextDetail" text="Ne pas déranger"/>
              </FlexboxLayout>
              <FlexboxLayout>
                <Icon :icon="$icons.call" class="call"/>
                <Icon :icon="$icons.conv" class="conv" marginLeft="38"/>
              </FlexboxLayout>
            </FlexboxLayout>
          </v-template>
        </ListView>
      </StackLayout>


    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Friends extends Vue {
    private friends = [
      {
        id: 0,
        avatar: '~/assets/images/avatar.jpeg',
        pseudo: 'quenti77'
      }
    ]
  }
</script>

<style lang="scss" scoped>
  @import '../style/variables';

  .darker {
    #friends {
      background-color: $darkerLight;

      .section  {
        color: #B9BBBE;
      }

      Label {
        color: $white;
      }

      .addFriend, .addConv {
        color: $white;
      }

      .statusTextDetail {
        color: $grey;
      }

      .call, .conv {
        color: #B9BBBE;
      }
    }
  }

  #friends {
    Label.section {
      font-size: 13;
      text-transform: uppercase;
      font-weight: bold;
      margin: 15 0 5 20;
    }

    .pseudoAndStatus {
      flex-direction: column;
      justify-content: center;
      margin-left: 15;
      flex-grow: 2;

      .pseudo {
        font-size: 16;
      }

      .statusTextDetail {
        font-size: 12;
      }
    }
  }
</style>
