<template>
<StackLayout>
  <CollectionView for="item in dummy" colWidth="auto" rowHeight="auto">
  <v-template if="$index === 0">
     <Icon @event="goToChat" col="5" height="55" width="55" padding="10" marginBottom="16" :icon="$icons.conversation" :backgroundColor="chatHead ? '#7289da' : '#2E3036'" borderRadius="15"  fontSize="40" />
  </v-template>
    <v-template>
        <Image @tap="goToServer" :src="`https://avatars3.githubusercontent.com/u/1331813${item.uri}`" />
    </v-template>
  </CollectionView>
</StackLayout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

/* Components */
import Icon from '@/layouts/Icon.vue'

@Component({
  components: {
    Icon
  }
})
export default class Servers extends Vue {
/* Color changing of direct chat toggle */
@Prop({default: true}) readonly isDirectChat

private chatHead: boolean = true

created() {
  this.chatHead = this.isDirectChat
}

  private dummy: any = [
    {uri: 1},
    {uri: 2},
    {uri: 3},
    {uri: 4},
    {uri: 5},
    {uri: 6},
    {uri: 7},
    {uri: 8},
    {uri: 9},
    {uri: 10},
    {uri: 11},
    {uri: 12},
    {uri: 13},
    {uri: 14},
    {uri: 15},
    {uri: 16},
    {uri: 17},
    {uri: 18},
    {uri: 19},
    {uri: 20},
  ]

  goToChat() {
    console.log('tapped')
    this.$emit('isChat', true)
    this.chatHead = true
  }

  goToServer() {
    /* Note: you can pass data to this function to call vuex dispatch to dynamically load channel list */
    this.$emit('isChat', false) // <--- false value to id or any data for API
    this.chatHead = false
  }
}

</script>

<style lang="scss" scoped>
StackLayout {
  padding: 0;
}

Image {
  width: 55;
  height: 55;
  border-radius: 50%;
  margin-bottom: 14;

}
</style>
