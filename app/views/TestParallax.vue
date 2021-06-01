<template>
  <Page :actionBarHidden="true">
    <AbsoluteLayout height="200%" width="200%" backgroundColor="red">
      <Image src="~/assets/back.jpg"
             stretch="fill"
             ref="back"
             id="back"/>
      <Image src="~/assets/perso.png"
             id="perso"
             ref="perso"/>
    </AbsoluteLayout>
  </Page>
</template>

<script lang="ts">
  import { startAccelerometerUpdates } from '@triniwiz/nativescript-accelerometer'
  import { Screen } from '@nativescript/core'

  export default {
    mounted () {
      startAccelerometerUpdates((data: {x: number, y: number, z: number}) => {
        this.$refs.perso.nativeView.animate({
          translate: {
            x: (data.x / Screen.mainScreen.scale) * 100,
            y: (data.y / Screen.mainScreen.scale) * 100
          }
        })

        this.$refs.back.nativeView.animate({
          translate: {
            x: -((data.x / Screen.mainScreen.scale) * 50),
            y: -((data.y / Screen.mainScreen.scale) * 50)
          }
        })
      }, { sensorDelay: 'ui' })
    }
  }
</script>

<style>
  #back {
    width: 120%;
    height: 120%;
    top: 0;
    left: 0;
  }

  #perso {
    height: 70%;
    width: 70%;
    top: 280;
    left: 100;
  }
</style>
