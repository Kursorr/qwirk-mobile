<template>
<WrapLayout>
    <StackLayout class="server" :width="server" height="100%">
        <Servers />
    </StackLayout>
    <StackLayout class="channel" :width="channel" height="100%">
        <GridLayout rows="auto,*">
            <GridLayout row="0" columns="10,*,*" :height="header">
                <HTMLLabel col="1" html="La bande à ExSou" :paddingTop="header/4"  fontSize="18" fontWeight="bold" />
                <Icon col="2" height="40" width="40" padding="10" :icon="$icons.verticalDots" fontSize="20" horizontalAlignment="right" />
            </GridLayout>
        </GridLayout>
    </StackLayout>
</WrapLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Screen } from '@nativescript/core'

import Servers  from '@/layouts/Home/components/Servers.vue'
import Icon from '@/layouts/Icon.vue'

@Component({
    components: {
        Servers,
        Icon
    }
})
export default class LeftDrawer extends Vue {

/* Computation */
private server: number = Screen.mainScreen.widthDIPs * 0.18
private channel: number = Screen.mainScreen.widthDIPs * 0.67
private header: number = Screen.mainScreen.widthDIPs * 0.14

}
</script>
