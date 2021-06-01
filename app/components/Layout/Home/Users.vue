<template>
  <StackLayout class="usersSection">
    <Label fontSize="20"
           fontWeight="bold"
           text="🔔 Notifications"/>
    <Label v-for="a in 10"
           :key="a"
           :textWrap="true"
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
  @import '../../../style/variables';

  .darker {
    .usersSection {
      background-color: #2F3136;

      Label {
        color: $white;
      }
    }
  }

  .lighter {
    .usersSection {
      background-color: red;
    }
  }

  .usersSection {
    height: 100%;
    border-top-left-radius: 10;
  }
</style>
