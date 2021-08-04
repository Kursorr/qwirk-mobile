<template>
 <CollectionView :items="emo"  colWidth="17%" rowHeight="52">
    <v-template>
        <Label :text="item.emoji" @tap="gridViewItemTap(item.emoji)" class="tx-center" fontSize="35" />
    </v-template>
  </CollectionView>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

const emoji = require('../../../assets/icons/emoji.json')

@Component
export default class EmojiView extends Vue {
    private emo: any = emoji

    gridViewItemTap(em) {
        this.$emit('emoji', em)
    }
}
</script>
