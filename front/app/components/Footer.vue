<template>
  <FlexboxLayout class="container">
    <StackLayout class="imageContainer" @tap="gotoApp">
      <SVGImage src="~/assets/images/logo.svg"
                class="selected"
                height="20"
                width="20"/>
    </StackLayout>

    <StackLayout class="imageContainer" @tap="gotoFriends">
      <SVGImage src="~/assets/images/friends.svg"
                class="selected"
                height="20"
                width="20"/>
    </StackLayout>

    <StackLayout class="imageContainer">
      <SVGImage src="~/assets/images/search.svg"
                class="selected"
                height="20"
                width="20"/>
    </StackLayout>

    <StackLayout class="imageContainer">
      <SVGImage src="~/assets/images/at.svg"
                class="selected"
                height="20"
                width="20"/>
    </StackLayout>

    <StackLayout class="imageContainer">
      <SVGImage src="~/assets/images/art.svg"
                class="selected"
                height="20"
                width="20"/>
    </StackLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Footer extends Vue {
    gotoApp () {
      // @ts-ignore
      this.$navigator.navigate('home', {
        frame: 'navigator',
        animated: true,
        transition: {
          name: 'slideRight',
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
    justify-content: space-around;
    padding: 0 10;

    .imageContainer {
      height: 100%;
      width: 20%;
      padding: 15 0;

      .selected {
        opacity: 0.5;
      }
    }
  }
</style>
