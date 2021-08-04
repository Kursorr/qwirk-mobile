<template>
<WrapLayout>
    <StackLayout class="server" :width="server" :height="footer">
        <Servers @isChat="changeView" :isDirectChat="isDirectChat" />
    </StackLayout>
    <StackLayout class="channel" :width="channel" :height="footer">
        <GridLayout rows="auto,auto,*">

            <GridLayout :visibility="isDirectChat ? 'visible' : 'collapse'" row="0" columns="10,*,40" :height="header*0.8">
                <HTMLLabel col="1" html="Direct Message" :paddingTop="header/4"  fontSize="16" fontWeight="bold" />
                <Icon col="2" height="40" width="40" padding="5" :icon="$icons.addConv" fontSize="20" horizontalAlignment="right" />
            </GridLayout>
             <TextField :visibility="isDirectChat ? 'visible' : 'collapse'" row="1" ref="search" hint="Search" class="searchbox" borderBottom="transparent" />

            <GridLayout :visibility="isDirectChat === false ? 'visible' : 'collapse'" row="0" columns="10,*,40" :height="header">
                <HTMLLabel col="1" html="La bande à ExSou" :paddingTop="header/4"  fontSize="16" fontWeight="bold" />
                <Icon col="2" height="40" width="40" padding="10" :icon="$icons.verticalDots" fontSize="20" horizontalAlignment="right" />
            </GridLayout>

            <DirectChat :visibility="isDirectChat ? 'visible' : 'collapse'" :touchEvt="touchEvt" row="2" />
            <Channels :visibility="isDirectChat === false ? 'visible' : 'collapse'" :touchEvt="touchEvt" row="2" @event="onChannelChange" />
        </GridLayout>
    </StackLayout>
</WrapLayout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { Screen } from '@nativescript/core'

import Servers  from '@/layouts/Home/components/Servers.vue'
import Icon from '@/layouts/Icon.vue'
import Channels from '@/layouts/Home/components/Channels.vue'
import DirectChat from '@/layouts/Home/components/DirectChat.vue'

@Component({
    components: {
        Servers,
        Icon,
        Channels,
        DirectChat
    }
})
export default class LeftDrawer extends Vue {
/* Gesture Position */
@Prop({default: true}) readonly touchEvt: boolean = true

/* Computation */
private server: number = Screen.mainScreen.widthDIPs * 0.20
private channel: number = Screen.mainScreen.widthDIPs * 0.66
private header: number = Screen.mainScreen.widthDIPs * 0.14
private footer: number = Screen.mainScreen.heightDIPs * 0.90
private margin: number = Screen.mainScreen.heightDIPs * 0.05

/* Toggle */
private isDirectChat: boolean = true

/* Change Screen toggle for channel to direct chat or vise versa */
changeView(d) {
    this.isDirectChat = d
}

onChannelChange() {
    this.$emit('onChannelChange')
}
}
</script>
