<template>
  <FlexboxLayout class="container">
    <FlexboxLayout @tap="gotoLink('home')">
      <Icon :icon="$icons.logo"
            class="footer"
            :class="[activeHome ? 'enable' : 'disabled']"/>
    </FlexboxLayout>

    <FlexboxLayout @tap="gotoLink('friends')">
      <Icon :icon="$icons.friends"
            class="footer"
            :class="[activeFriends ? 'enable' : 'disabled']"/>
    </FlexboxLayout>

    <FlexboxLayout>
      <Icon :icon="$icons.search"
            class="footer"
            :class="[activeSearch ? 'enable' : 'disabled']"/>
    </FlexboxLayout>

    <FlexboxLayout @tap="gotoLink('editor')">
      <Icon :icon="$icons.editor"
            class="footer"
            :class="[activeEditor ? 'enable' : 'disabled']"/>
    </FlexboxLayout>

    <FlexboxLayout @tap="gotoLink('profile')">
      <Avatar :class="[activeProfile ? 'enable' : 'disabled']"/>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Footer extends Vue {
    public activeHome: boolean = true
    public activeFriends: boolean = false
    public activeSearch: boolean = false
    public activeEditor: boolean = false
    public activeProfile: boolean = false

    private options = {
      frame: 'navigator',
      animated: true,
      transition: {
        name: 'slideRight',
        duration: 200,
        curve: 'easeOut'
      }
    }

    gotoLink (route) {
      this.activeHome = false
      this.activeFriends = false
      this.activeSearch = false
      this.activeEditor = false
      this.activeProfile = false

      if (route === 'home') {
        // @ts-ignore
        this.$globalState.hideFooter()
        this.activeHome = true

        setTimeout(() => {
          // @ts-ignore
          this.$navigator.navigate('home', this.options)
          // @ts-ignore
          this.$globalState.removeOpacity()
        })
      } else if (route === 'friends') {
        this.activeFriends = true
        // @ts-ignore
        this.$navigator.navigate('friends', this.options)
      } else if (route === 'editor') {
        this.activeEditor = true
        // @ts-ignore
        this.$navigator.navigate('editor', this.options)
      } else if (route === 'profile') {
        this.activeProfile = true
        // @ts-ignore
        this.$navigator.navigate('profile', this.options)
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import '../../../style/variables';

  .darker {
    .footer {
      color: $white;
    }
  }

  .container {
    align-items: center;
    justify-content: space-around;

    FlexboxLayout {
      padding: 16 0;
      width: 20%;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .enable { opacity: 1; }
      .disabled { opacity: 0.5; }
    }

    .footer {
      font-size: 18;
    }
  }
</style>
