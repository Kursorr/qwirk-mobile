<template>
  <GridLayout :opacity="opacity" rows="auto, *, auto" class="userlist">
    <StackLayout row="0" class="header">
      <GridLayout columns="10,45,40, *, 45, 45" :height="header">
        <Icon col="1" height="40" width="40" padding="10" :icon="$icons.menu" fontSize="20" class="tx-center" />
        <Icon col="2" height="40" width="40" padding="10" :icon="$icons.hashtag" fontSize="20" class="tx-center" />
        <HTMLLabel col="3" :paddingTop="header/4" html="General" fontSize="20" fontWeight="bold" />
        <Icon col="4" height="40" width="40" padding="10" :icon="$icons.search"  fontSize="20" horizontalAlignment="right" />
        <Icon col="5" height="40" width="40" padding="10" :icon="$icons.users"  fontSize="20" />
      </GridLayout>
    </StackLayout>

    <CollectionView :isScrollEnabled="touchEvt"  row="1" reverseLayout="true" for="item in dummy" colWidth="100%" rowHeight="auto">
      <v-template>
        <ChatCard :icon="item.icon" :username="item.name" :date="item.time" :content="item.content" />
      </v-template>
    </CollectionView>

    <StackLayout row="2">
      <GridLayout columns="10,50,50,*" :height="header" :marginBottom="keyboard">
        <Icon col="1" height="40" width="40" padding="10" :icon="$icons.camera" fontSize="22" backgroundColor="#1F2225" borderRadius="50" class="tx-center" />
        <Icon col="2" height="40" width="40" padding="10" :icon="$icons.gallery" fontSize="22" backgroundColor="#1F2225" borderRadius="50" class="tx-center" />
        <TextView col="3" v-model="chatData" hint="Type a message" minHeight="20" borderBottom="transparent" textWrap="true" />
        <Icon col="3" height="40" width="40" padding="10" :icon="$icons.emote"  fontSize="22" backgroundColor="#1F2225" borderRadius="50" horizontalAlignment="right" marginRight="20" />
      </GridLayout>
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'

import { Screen } from '@nativescript/core'

/* Components */
import ChatCard from '@/layouts/ChatCard.vue'
import Icon from '@/layouts/Icon.vue'

@Component({
    components: {
        ChatCard,
        Icon
    }
})
export default class RightDrawer extends Vue {
  /* Computation */
  private header: number = Screen.mainScreen.widthDIPs * 0.14
  private footer: number = Screen.mainScreen.widthDIPs * 0.14
  private chatData: string = ''
  private newLine: boolean = false
  private purpleInput: boolean = false


/* Watches Keyboard Height */
  get keyboard() {
    return this.$store.state.h
  }

/* Opacity */
get opacity() {
  return this.$store.state.o
}

/* Gesture Position */
@Prop({default: true}) readonly touchEvt: boolean = true

/* Chat Input Listener */
   @Watch('chatData')
   onChangeChatData(val) {
     let charCount = val.length + (val.match(/\n/) !== null ? val.match(/\n/gm).length : 0)
    if(charCount === 0) {
      this.newLine = false
    } else if(val !== "") {
      this.newLine = true
      this.purpleInput = true
    } else {
      this.newLine = true
      this.purpleInput = false
    }
   }

  /* Dummy */
  private dummy: any = [
    { index: 0, name: "Kursörr", color: "#1abc9c", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 1, name: "Kursörr", color: "#2ecc71", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 2, name: "Kursörr", color: "#3498db", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 3, name: "Kursörr", color: "#9b59b6", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 4, name: "Kursörr", color: "#34495e", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 5, name: "Kursörr", color: "#16a085", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 6, name: "Kursörr", color: "#27ae60", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 7, name: "Kursörr", color: "#2980b9", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 8, name: "Kursörr", color: "#8e44ad", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 9, name: "Kursörr", color: "#2c3e50", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 0, name: "Kursörr", color: "#1abc9c", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 1, name: "Kursörr", color: "#2ecc71", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 2, name: "Kursörr", color: "#3498db", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 3, name: "Kursörr", color: "#9b59b6", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 4, name: "Kursörr", color: "#34495e", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 5, name: "Kursörr", color: "#16a085", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 6, name: "Kursörr", color: "#27ae60", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 7, name: "Kursörr", color: "#2980b9", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 8, name: "Kursörr", color: "#8e44ad", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 9, name: "Kursörr", color: "#2c3e50", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 0, name: "Kursörr", color: "#1abc9c", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 1, name: "Kursörr", color: "#2ecc71", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 2, name: "Kursörr", color: "#3498db", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 3, name: "Kursörr", color: "#9b59b6", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 4, name: "Kursörr", color: "#34495e", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 5, name: "Kursörr", color: "#16a085", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 6, name: "Kursörr", color: "#27ae60", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 7, name: "Kursörr", color: "#2980b9", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 8, name: "Kursörr", color: "#8e44ad", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 9, name: "Kursörr", color: "#2c3e50", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 0, name: "Kursörr", color: "#1abc9c", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 1, name: "Kursörr", color: "#2ecc71", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 2, name: "Kursörr", color: "#3498db", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 3, name: "Kursörr", color: "#9b59b6", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 4, name: "Kursörr", color: "#34495e", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 5, name: "Kursörr", color: "#16a085", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 6, name: "Kursörr", color: "#27ae60", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 7, name: "Kursörr", color: "#2980b9", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 8, name: "Kursörr", color: "#8e44ad", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
    { index: 9, name: "Kursörr", color: "#2c3e50", content: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum", time:"2012-04-23T18:25:43.511Z", icon: "https://cdn.discordapp.com/avatars/727459927915757618/c18c1cf1b3dd33faae4a60f871162f6d.png?size=128" },
  ];
}
</script>

<style lang="scss" scoped>
 .center {
  display: flex;
  justify-content: center;
  align-items: center;
  }
</style>
