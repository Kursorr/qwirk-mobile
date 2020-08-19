<template>
  <StackLayout verticalAlignment="center">
    <Label fontSize="18"
           textAlignment="center"
           color="#FFF"
           text="👈🏾 slide to the left or slide to the right 👉🏾" />
  </StackLayout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Tchat extends Vue {}
</script>
