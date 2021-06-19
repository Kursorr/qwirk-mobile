<template>
<WrapLayout>
    <StackLayout class="server" :width="server" height="100%">
    </StackLayout>
    <StackLayout class="channel" :width="channel" height="100%">
    </StackLayout>
</WrapLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Screen } from '@nativescript/core'

@Component
export default class LeftDrawer extends Vue {

/* Computation */
private server: number = Screen.mainScreen.widthDIPs * 0.17
private channel: number = Screen.mainScreen.widthDIPs * 0.68

}
</script>
