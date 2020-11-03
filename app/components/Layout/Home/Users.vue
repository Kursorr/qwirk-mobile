<template>
  <StackLayout class="usersSection">
    <Label fontSize="20"
           fontWeight="bold"
           text="🔔 Notifications"/>
    <Label :textWrap="true" v-for="a in 10"
           :key="a"
           :text="'Example text ' + a + '. This text should now be long enough that it wraps to the next line.'">
    </Label>
  </StackLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Users extends Vue {
  }
</script>

<style lang="scss" scoped>
  StackLayout {
    height: 100%;
    border-top-left-radius: 10;
  }
</style>
