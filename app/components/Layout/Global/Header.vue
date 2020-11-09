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
  @import '../../../style/variables';

  .headerSection {
    &.onMain {
      border-top-left-radius: 10;
      border-top-right-radius: 10;
    }

    Label {
      font-size: 18;
    }

    .header {
      padding: 15 0;
      margin: 0 20;
      width: 100%;
      justify-content: space-between;

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
      background-color: #2F3136;

      .hashtag {
        color: $grey;
      }

      .title {
        color: $white;
      }
    }
  }
</style>
