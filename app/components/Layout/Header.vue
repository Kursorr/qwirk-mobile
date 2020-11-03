<template>
  <FlexboxLayout :class="displayBorderRadius ? 'headerSection onMain': 'headerSection'">
    <FlexboxLayout class="header">
      <slot name="left"/>
      <slot name="right"/>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Header extends Vue {
    @Prop({default: false})
    displayBorderRadius: boolean
  }
</script>

<style lang="scss" scoped>

</style>
