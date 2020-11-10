<template>
  <AbsoluteLayout id="profile">
    <Image :class="avatarSize"
           :src="imagePath"
           stretch="aspectFill"/>
    <StackLayout class="status online" :class="avatarSize"/>
  </AbsoluteLayout>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class Avatar extends Vue {
    @Prop({ default: null }) private url?: string
    @Prop({ default: 'small' }) private size!: string

    get imagePath () {
      if (this.url === null || this.url === undefined) {
        return '~/assets/images/avatar.png'
      } else if (this.url.indexOf('data:') !== -1) {
        return this.url
      } else {
        return 'http://localhost:4100/avatars/' + this.url
      }
    }

    get avatarSize () {
      return {
        'avatar-small': this.size === 'small',
        'avatar-medium': this.size === 'medium',
        'avatar-normal': this.size === 'normal',
        'avatar-big': this.size === 'big'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/variables';

  #profile {
    Image {
      border-radius: 50%;

      &.avatar-small {
        height: 24;
        width: 24;
      }

      &.avatar-medium {
        height: 40;
        width: 40;
      }
    }

    .status {
      border-radius: 50%;
      border-color: $darkerLight; // work on Friends page

      &.avatar-small {
        border-width: 2;
        border-color: $darkerFirst; // work on Footer -> need to find a solution
        height: 11;
        width: 11;
        left: 14;
        top: 14;
      }

      &.avatar-medium {
        border-width: 3;
        height: 15;
        width: 15;
        left: 27;
        top: 27;
      }
    }
  }
</style>
