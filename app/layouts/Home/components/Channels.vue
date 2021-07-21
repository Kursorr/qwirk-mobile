<template>
  <ScrollView orientation="vertical" scrollBarIndicatorVisible="false" :isUserInteractionEnabled="touchEvt">
      <StackLayout orientation="vertical">
          <StackLayout v-for="(category, index) in dummy.categories" :key="index" @pan="returnGesture">
            <!-- Title Chev -->
            <GridLayout columns="15,*" rows="40" paddingLeft="5" @tap="toggle(category.id)">
                <Icon color="#747f8d" :icon="category.visible ? $icons.chevronDown : $icons.chevronUp" col="0" />
                <HTMLLabel color="#747f8d" :html="category.title" col="1" />
            </GridLayout>
            <!-- Content  -->
            <GridLayout :visibility="category.visible ? 'visible': 'collapse'"  v-for="(channel, index) in category.channels" :key="index" columns="15,20,*" rows="40" paddingLeft="15">
                <Icon :icon="$icons.hashtag" col="0" fontSize="16" />
                <HTMLLabel :html="channel.name" col="2" fontSize="16"  />
            </GridLayout>
          </StackLayout>
      </StackLayout>
  </ScrollView>
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
/* Note: Adding visible default coming from api then using vuex it can mutate
*  or toggling visibility of categories
*/

    private dummy: any =
    {
        name: 'La bande à ExSou',
        categories: [
        {
            id: 0,
            title: 'jeux vidéos',
            visible: true,
            channels: [
            {
                id: 0,
                name: 'among-us',
            },
            {
                id: 1,
                name: 'sekiro',
            },
            {
                id: 2,
                name: 'dark-souls-III',
            },
            ],
        },
        {
            id: 1,
            title: 'la zone 42',
            visible: true,
            channels: [
            {
                id: 0,
                name: 'dev-informatique',
            },
            {
                id: 1,
                name: 'hardware',
            },
            ],
        },
        {
            id: 2,
            title: 'la zone 42',
            visible: true,
            channels: [
            {
                id: 0,
                name: 'dev-informatique',
            },
            {
                id: 1,
                name: 'hardware',
            },
            ],
        },
        {
            id: 3,
            title: 'la zone 42',
            visible: true,
            channels: [
            {
                id: 0,
                name: 'dev-informatique',
            },
            {
                id: 1,
                name: 'hardware',
            },
            ],
        },
        {
            id: 4,
            title: 'la zone 42',
            visible: true,
            channels: [
            {
                id: 0,
                name: 'dev-informatique',
            },
            {
                id: 1,
                name: 'hardware',
            },
            ],
        },
        {
            id: 5,
            title: 'la zone 42',
            visible: true,
            channels: [
            {
                id: 0,
                name: 'dev-informatique',
            },
            {
                id: 1,
                name: 'hardware',
            },
            ],
        },
        {
            id: 6,
            title: 'la zone 42',
            visible: true,
            channels: [
            {
                id: 0,
                name: 'dev-informatique',
            },
            {
                id: 1,
                name: 'hardware',
            },
            ],
        },
        {
            id: 7,
            title: 'la zone 42',
            visible: true,
            channels: [
            {
                id: 0,
                name: 'dev-informatique',
            },
            {
                id: 1,
                name: 'hardware',
            },
            ],
        },
        ],
    }

    toggle(d) {
        /* Sample for this.$store.commit('mutate', payload ) */
       let mutate = this.dummy.categories.findIndex((a => a.id == d))
       this.dummy.categories[mutate].visible = this.dummy.categories[mutate].visible ? false : true
    }

}
</script>

<style>

</style>
