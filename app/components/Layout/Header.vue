<template>
  <FlexboxLayout class="headerSection" row="0">
    <FlexboxLayout class="header">
      <FlexboxLayout alignItems="center">
        <Label :text="String.fromCharCode($icons.menu)"
               class="ico menu"/>
        <Label :text="String.fromCharCode($icons.hashtag)"
               class="ico hashtag"/>
        <Label text="general"
               class="title"/>
      </FlexboxLayout>
      <FlexboxLayout>
        <Label :text="String.fromCharCode($icons.search)"
               class="ico search"/>
        <Label :text="String.fromCharCode($icons.users)"
               class="ico users"/>
      </FlexboxLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>

</style>
