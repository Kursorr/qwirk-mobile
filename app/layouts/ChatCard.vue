<template>
<WrapLayout class="container" @pan="returnGesture"  width="100%">
    <Image class="icon" :src="icon" />
    <StackLayout width="80%">
        <HtmlLabel class="title" :html="username + ' ' + parseTime(date) " linkColor="#888888" linkUnderline="false"  />
        <Label textWrap="true" class="content" text="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"></Label>
    </StackLayout>
</WrapLayout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import Timer from "@/utils/timeparser";

@Component
export default class ChatCard extends Vue {
  @Prop({default: 'res://avadef'}) readonly icon
  @Prop({default: 'User'}) readonly username
  @Prop({default: '2012-04-23T18:25:43.511Z'}) readonly date
  @Prop({default: 'Loading'}) readonly content

  returnGesture(e) {
    return e
  }

    parseTime(value) {
    let xtimes = new Timer(value);
    return `<a href="">${xtimes.timeAgo()}</a>`;
  }
}
</script>

<style lang="scss">
.container {
    padding: 11;

    .icon {
        width: 50;
        height: 52;
        border-radius: 50;
    }

    .title {
        padding-left: 20;
        color: #ffffff;
        font-weight: bold;
    }

    .content {
        margin-top: 10;
        padding-left: 20;
        color: #c7c7c7;
    }
}

</style>

