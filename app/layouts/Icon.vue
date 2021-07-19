<template>
  <HTMLLabel :html="icon"
         @tap="tapEvent"
         class="ico"/>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
  @Component
  export default class Icon extends Vue {
    @Prop({default: 'res://avadef'}) readonly icon: string

    @Emit('event')
    tapEvent(e) {
        return e
    }
  }
</script>
