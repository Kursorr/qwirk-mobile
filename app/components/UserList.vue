<template>
  <StackLayout>
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
export default class UserList extends Vue {
}
</script>

<style lang="scss" scoped>
Label {
  color: #FFF;
}
</style>
