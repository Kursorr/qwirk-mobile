<template>
  <FlexboxLayout class="container">
    <FlexboxLayout class="gotoIcon" @tap="gotoLink('home')">
      <Icon
        :icon="$icons.logo"
        class="icon"
        :class="[activeHome ? 'enable' : 'disabled']"
      />
    </FlexboxLayout>

    <FlexboxLayout class="gotoIcon" @tap="gotoLink('friends')">
      <Icon
        :icon="$icons.friends"
        class="icon"
        :class="[activeFriends ? 'enable' : 'disabled']"
      />
    </FlexboxLayout>

    <FlexboxLayout class="gotoIcon">
      <Icon
        :icon="$icons.search"
        class="icon"
        :class="[activeSearch ? 'enable' : 'disabled']"
      />
    </FlexboxLayout>

    <FlexboxLayout class="gotoIcon" @tap="gotoLink('editor')">
      <Icon
        :icon="$icons.editor"
        class="icon"
        :class="[activeEditor ? 'enable' : 'disabled']"
      />
    </FlexboxLayout>

    <FlexboxLayout class="gotoIcon avatar" @tap="gotoLink('profile')">
      <Avatar :class="[activeProfile ? 'enable' : 'disabled']" />
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Icon from '@/layouts/Icon.vue'
import Avatar from '@/layouts/Avatar.vue'

@Component({
  components: {
    Icon,
    Avatar,
  }
})
export default class Footer extends Vue {
  public activeHome: boolean = true
  public activeFriends: boolean = false
  public activeSearch: boolean = false
  public activeEditor: boolean = false
  public activeProfile: boolean = false

  private options = {
    transition: {
      name: 'slideRight',
      duration: 200,
      curve: 'easeOut',
    },
  }
  gotoLink(route) {
    this.activeHome = false
    this.activeFriends = false
    this.activeSearch = false
    this.activeEditor = false
    this.activeProfile = false

    if (route === 'home') {
      this.activeHome = true

      setTimeout(() => {
        this.$navigator.navigate('home', this.options)
      })
    } else if (route === 'friends') {
      this.activeFriends = true
      this.$navigator.navigate('friends', this.options)
    } else if (route === 'editor') {
      this.activeEditor = true
      this.$navigator.navigate('editor', this.options)
    } else if (route === 'profile') {
      this.activeProfile = true
      this.$navigator.navigate('profile', this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.container {
  align-items: center;
  justify-content: space-around;
  background-color: #1c1e22;
  FlexboxLayout.gotoIcon {
    padding: 20 0;
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

  .icon {
    font-size: 18;
  }
}
</style>
