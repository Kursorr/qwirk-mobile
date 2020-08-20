<template>
  <FlexboxLayout class="container">
    <SVGImage src="~/assets/images/logo.svg"
              class="selected"
              @tap="gotoProfile"
              height="20"
              width="20"/>

    <SVGImage src="~/assets/images/friends.svg"
              class="selected"
              @tap="gotoFriends"
              height="20"
              width="20"/>

    <SVGImage src="~/assets/images/search.svg"
              class="selected"
              height="20"
              width="20"/>

    <SVGImage src="~/assets/images/at.svg"
              class="selected"
              height="20"
              width="20"/>
  </FlexboxLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Footer extends Vue {
    gotoProfile () {
      // @ts-ignore
      this.$navigator.navigate('profile', {
        frame: 'navigator',
        animated: true,
        transition: {
          name: 'slideLeft',
          duration: 200,
          curve: 'easeOut'
        }
      })
    }

    gotoFriends () {
      // @ts-ignore
      this.$navigator.navigate('friends', {
        frame: 'navigator',
        animated: true,
        transition: {
          name: 'slideLeft',
          duration: 200,
          curve: 'easeOut'
        }
      })
    }
  }
</script>

<style lang="scss">
  .container {
    align-items: center;
    justify-content: space-between;

    .selected {
      opacity: 0.5;
    }
  }
</style>
