<template>
<CollectionView for="item in dummy" colWidth="auto" rowHeight="auto">
  <v-template if="$index === 0">
      <Icon col="5" height="55" width="55" padding="10" marginBottom="16" :icon="$icons.conversation" backgroundColor="#7289da" borderRadius="50"  fontSize="40" />
  </v-template>
  <v-template>
      <Image :src="`https://avatars3.githubusercontent.com/u/1331813${item.uri}`" />
  </v-template>
</CollectionView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/* Components */
import Icon from '@/layouts/Icon.vue'

@Component({
  components: {
    Icon
  }
})
export default class Servers extends Vue {
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
