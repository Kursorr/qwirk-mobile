<template>
  <Page :actionBarHidden="true" class="welcome">
    <GridLayout columns="*" rows="*, auto" class="container">
      <FlexboxLayout alignItems="center" justifyContent="center">
        <Icon :icon="$icons.logo" class="logo" color="#FFF"/>
      </FlexboxLayout>

      <StackLayout row="1">
        <Label text="Bienvenue sur Qwirk" class="title"/>
        <Label :textWrap="true"
               class="text"
               text="Rejoins plus de 200 millions de personnes qui utilisent Qwirk pour discuter avec des amis gratuitement."/>

        <Button text="S'inscrire"
                @tap="register"
                class="register"/>
        <Button text="Se connecter"
                @tap="login"
                class="login"/>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Welcome extends Vue {


    register () {

    }

    login () {

    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/variables';

  .welcome {
    background: url('~/assets/images/background.jpg') no-repeat;
    background-size: cover;
  }

  .logo {
    font-size: 62;
  }

  StackLayout {
    width: 90%;
    margin-bottom: 25;

    Label {
      color: $white;
      text-align: center;

      &.title {
        font-size: 22;
        font-weight: bold;
        margin-bottom: 10;
      }

      &.text {
        font-size: 14;
        line-height: 2;
        margin-bottom: 25;
      }
    }

    Button {
      text-transform: none;
      border-radius: 4;
      color: $white;
      font-size: 16;
      font-weight: bold;

      &.register {
        background-color: $blue;
        margin-bottom: 10;
      }

      &.login {
        background-color: $anotherGrey;
      }
    }
  }
</style>
