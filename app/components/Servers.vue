<template>
  <StackLayout>
    <Label fontSize="20" fontWeight="bold"
           text="🙈 Channels"></Label>
    <Image width="60" height="60"
           borderRadius="100"
           v-for="a in 10"
           :key="a"
           :src="`https://avatars3.githubusercontent.com/u/1331813${a}`">
    </Image>
  </StackLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Users extends Vue {}
</script>
