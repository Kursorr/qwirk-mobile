<template>
<WrapLayout>
    <GridLayout rows="auto, *, auto" class="userlist" width="100%" height="100%">
        <StackLayout row="0" class="header" :height="header">
        </StackLayout>
        <StackLayout row="1">
        </StackLayout>
        <StackLayout row="2" class="footer" width="100%" :height="header">
        </StackLayout>
    </GridLayout>
</WrapLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Screen } from '@nativescript/core'

@Component
export default class RightDrawer extends Vue {

/* Computation */
private header: number = Screen.mainScreen.widthDIPs * 0.15

}
</script>
