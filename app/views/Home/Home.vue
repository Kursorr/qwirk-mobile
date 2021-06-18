/**
 * File: Home Screen
 *
 * Date Created: 06192021
 * Date Modified: 06192021
**/

<template>
<Page actionBarHidden="true">
   <GridLayout :marginTop="currentStatusbar">
        <Label>Hello World</Label>
   </GridLayout>
</Page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Root extends Vue {

 /* Get the height from Vuex */
 get currentStatusbar(): number {
     return this.$store.state.s
 }

}
</script>
