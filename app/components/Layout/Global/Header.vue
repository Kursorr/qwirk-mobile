<template>
  <FlexboxLayout
    :class="
      displayBorderRadius
        ? 'headerSection content-header  onMain'
        : 'content-header  headerSection'
    "
  >
    <FlexboxLayout class="header">
      <slot name="left" />
      <slot name="right" />
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  @Prop({ default: false })
  displayBorderRadius: boolean
}
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.headerSection {
  &.onMain {
    border-top-left-radius: 15;
    border-top-right-radius: 15;
  }

  Label {
    font-size: 18;
  }

  .header {
    padding: 15 0;
    margin: 0 20;
    width: 100%;
    justify-content: space-between;

    .title {
      font-size: 18;
      font-weight: bold;
    }

    .menu {
      margin-right: 20;
    }

    .hashtag {
      margin-right: 5;
    }

    .search {
      margin-right: 30;
    }
  }
}

.darker {
  .headerSection {
    .hashtag {
      color: $grey;
    }

    .title {
      color: $white;
    }
  }
}
</style>
