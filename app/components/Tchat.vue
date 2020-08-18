<template>
  <Label fontSize="18"
         verticalAlignment="center"
         textAlignment="center"
         text="👈🏾 slide to the left or slide to the right 👉🏾" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Tchat extends Vue {
}
</script>

<style lang="scss">
  Label {
    color: #FFF;
  }
</style>
