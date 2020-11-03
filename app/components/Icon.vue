<template>
  <Label :text="String.fromCharCode(icon)"
         class="ico"/>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Icon extends Vue {
    @Prop() icon
  }
</script>
