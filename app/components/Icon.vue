<template>
  <Label :text="String.fromCharCode(icon)"
         @tap="tapEvent"
         class="ico"/>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Icon extends Vue {
    @Prop() icon

    tapEvent () {
      this.$emit('event')
    }
  }
</script>
