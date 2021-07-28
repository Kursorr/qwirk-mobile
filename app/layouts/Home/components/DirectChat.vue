<template>
 <CollectionView for="item in dummy" colWidth="auto" rowHeight="auto" :isScrollEnabled="touchEvt">
  <v-template>
      <GridLayout columns="50,*" padding="10" @pan="returnGesture">
        <Image col="0" width="40" height="40" borderRadius="50"  :src="`https://avatars3.githubusercontent.com/u/1331813${item.uri}`" />
        <HTMLLabel col="1" :html="item.name" marginLeft="10" marginTop="10" fontSize="14" fontWeight="bold" />
      </GridLayout>
  </v-template>
</CollectionView>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import Icon from '@/layouts/Icon.vue'

@Component({
    components: {
        Icon
    }
})
export default class Channels extends Vue {

/* Gesture Position */
@Prop({default: true}) readonly touchEvt: boolean = true
@Emit('returnGesture')
returnGesture(e) {
    return e
}

  private dummy: any = [
    {uri: 1, name: 'User 1'},
    {uri: 2, name: 'User 2'},
    {uri: 3, name: 'User 3'},
    {uri: 4, name: 'User 4'},
    {uri: 5, name: 'User 5'},
    {uri: 6, name: 'User 6'},
    {uri: 7, name: 'User 7'},
    {uri: 8, name: 'User 8'},
    {uri: 9, name: 'User 9'},
    {uri: 10, name: 'User 10'},
    {uri: 11, name: 'User 11'},
    {uri: 12, name: 'User 12'},
    {uri: 13, name: 'User 13'},
    {uri: 14, name: 'User 14'},
    {uri: 15, name: 'User 15'},
    {uri: 16, name: 'User 16'},
    {uri: 17, name: 'User 17'},
    {uri: 18, name: 'User 18'},
    {uri: 19, name: 'User 19'},
    {uri: 20, name: 'User 20'},
  ]



}
</script>

<style>

</style>
