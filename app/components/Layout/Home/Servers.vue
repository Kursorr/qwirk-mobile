<template>
  <StackLayout>
    <Image v-for="a in 10" :key="a" :src="`https://avatars3.githubusercontent.com/u/1331813${a}`" />
  </StackLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Users extends Vue {}
</script>

<style lang="scss" scoped>
StackLayout {
  padding: 0;
}

Image {
  width: 50;
  height: 50;
  border-radius: 50%;
  margin-bottom: 14;
}
</style>
