<template>
  <StackLayout>
    <label fontSize="16"
           :textWrap="true"
           :key="i"
           v-for="(text,i) in loremTexts"
           :text="text">
    </label>
  </StackLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Channels extends Vue {
    private loremTexts = [
      '😇 You like this?',
      '🤗 I saw the emojis from Discord',
      '😎 I think they look cool',
      '😁 I changed the colours as well'
    ]
  }
</script>

<style lang="scss" scoped>
  @import '../style/variables.scss';

  StackLayout {
    background-color: $darkerLight;
    border-top-right-radius: 10;
  }

  Label {
    color: #FFF;
  }
</style>
