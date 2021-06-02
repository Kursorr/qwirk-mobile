<template>
  <StackLayout class="usersSection" padding="20">
    <Label
      v-for="a in 10"
      :key="a"
      :textWrap="true"
      :text="
        'Example text ' +
        a +
        '. This text should now be long enough that it wraps to the next line.'
      "
    >
    </Label>
  </StackLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Users extends Vue {}
</script>

