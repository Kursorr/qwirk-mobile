<template>
  <StackLayout class="channels">
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
      '😇 Channels ! :)',
      '🤗 Emojis from Discord',
      '😎 They look cool',
      '😁 Colours as well'
    ]
  }
</script>

<style lang="scss" scoped>
  @import '../style/variables.scss';

  .channels {
    border-top-right-radius: 10;
  }
</style>
