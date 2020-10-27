<template>
  <FlexboxLayout class="container">
    <FlexboxLayout @tap="gotoLink('home')">
      <Label textWrap="true"
             :text="String.fromCharCode($icons.logo)"
             class="ico footer"
             :class="[activeHome ? 'enable' : 'disabled']"
             color="#FFF"/>
    </FlexboxLayout>

    <FlexboxLayout @tap="gotoLink('friends')">
       <Label textWrap="true"
              :text="String.fromCharCode($icons.friends)"
              class="ico footer"
              :class="[activeFriends ? 'enable' : 'disabled']"
              color="#FFF"/>
    </FlexboxLayout>

    <FlexboxLayout>
      <Label textWrap="true"
           :text="String.fromCharCode($icons.search)"
           class="ico footer"
           :class="[activeSearch ? 'enable' : 'disabled']"
           color="#FFF"/>
    </FlexboxLayout>

    <FlexboxLayout @tap="gotoLink('editor')">
      <Label textWrap="true"
           :text="String.fromCharCode($icons.editor)"
           class="ico footer"
           :class="[activeEditor ? 'enable' : 'disabled']"
           color="#FFF"/>
    </FlexboxLayout>

    <FlexboxLayout>
      <Label textWrap="true"
             :text="String.fromCharCode($icons.arobase)"
             class="ico footer"
             :class="[activeProfil ? 'enable' : 'disabled']"
             color="#FFF"/>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { mapActions } from 'vuex'

  @Component({
    methods: {
      ...mapActions({
        sfooter: 'layout/sfooter'
      })
    }
  })
  export default class Footer extends Vue {
    public activeHome: boolean = true
    public activeFriends: boolean = false
    public activeSearch: boolean = false
    public activeEditor: boolean = false
    public activeProfil: boolean = false

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
      this.activeProfil = false

      if (route === 'home') {
        // @ts-ignore
        this.sfooter(false)
        this.activeHome = true

        setTimeout(() => {
          // @ts-ignore
          this.$navigator.navigate('home', this.options)
        })
      } else if (route === 'friends') {
        this.activeFriends = true
        // @ts-ignore
        this.$navigator.navigate('friends', this.options)
      } else if (route === 'editor') {
        this.activeEditor = true
        // @ts-ignore
        this.$navigator.navigate('editor', this.options)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .container {
    align-items: center;
    justify-content: space-around;

    FlexboxLayout {
      padding: 16 0;
      width: 20%;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .enable {
        opacity: 1;
      }

      .disabled {
        opacity: 0.5;
      }
    }
  }
</style>
