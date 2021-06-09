<template>
  <Page :actionBarHidden="true">
    <AbsoluteLayout height="100%" width="100%" backgroundColor="red">
      <!--
        Absolute top and left inline due Screen API width+height is first fire upon creating Image El,
       It should inline as stated at docs inline props is high priority upon rendering
        -->
      <Image top="-50" left="-50" src="~/assets/back.jpg" :width="width" :height="height" stretch="fill" ref="back" id="back" />
      <!-- Gif Support -->
      <ImageCacheIt src="~/assets/test3.gif" id="perso" stretch="aspectFill" ref="perso" />
    </AbsoluteLayout>
  </Page>
</template>

<script lang="ts">
/*
Notes: top and left inline value must be negative value and 50% of density fixture
EX: top = -50 because the additional fixture is 100 / 50%  = 50 to {-50}
*/

import { startAccelerometerUpdates } from "@triniwiz/nativescript-accelerometer";
import { Screen } from "@nativescript/core";

export default {
  data() {
    return {
      width: Screen.mainScreen.widthDIPs + 100, //Density Fixture as I said :)
      height: Screen.mainScreen.heightDIPs + 100, //Density Fixture as I said :)
    };
  },
  mounted() {
    startAccelerometerUpdates(
      (data: { x: number; y: number; z: number }) => {
        this.$refs.perso.nativeView.animate({
          translate: {
            x: (data.x / Screen.mainScreen.scale) * 150,
            y: (data.y / Screen.mainScreen.scale) * 150,
          },
        });

        this.$refs.back.nativeView.animate({
          translate: {
            x: -((data.x / Screen.mainScreen.scale) * 100),
            y: -((data.y / Screen.mainScreen.scale) * 100),
          },
        });
      },
      { sensorDelay: "ui" }
    );
  },
};
</script>

<style>
#back {
  width: 100%; /*This should be 100%*/
  height: 100%; /*This should be 100%*/
}

#perso {
  height: 300;
  width: 300;
  top: 300;
  left: 50;
}
</style>
