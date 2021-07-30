<template>
<WrapLayout horizontalAlignment="right">
    <StackLayout class="userlist" :width="width" height="100%">
        <StackLayout class="header" :height="header">
            <HTMLLabel html="🔔 Notification" :paddingTop="header/4" :paddingLeft="header/4"  fontSize="16" fontWeight="bold" />
        </StackLayout>
    </StackLayout>
</WrapLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Screen } from '@nativescript/core'

@Component
export default class RightDrawer extends Vue {

/* Computation */
private width: number = Screen.mainScreen.widthDIPs * 0.86
private header: number = Screen.mainScreen.widthDIPs * 0.17

}
</script>
