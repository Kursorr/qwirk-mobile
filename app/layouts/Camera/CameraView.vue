<template>
  <Page actionBarHidden="false">
    <ActionBar title="Take a photo" flat="true" />
    <CameraPlus @photoCapturedEvent="photoCapturedEvent($event)" ref="camera" height="100%" width="100%" debug="true" takePicIcon="shuttr" defaultCamera="rear" showFlashIcon="true" confirmPhotos="false" saveToGallery="true" autoSquareCrop="false" showToggleIcon="true" showCaptureIcon="true" showGalleryIcon="false">
    </CameraPlus>
  </Page>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class CameraView extends Vue {
  /* Declaration Types */
  $refs!: {
    dat: any
  };
  private timer: any = null
  photoCapturedEvent(e) {
    if (e) {
    console.log(e.data._android)
      this.timer = setTimeout(() => {
        this.back();
      }, 500);
    }
  }
  back() {
    clearTimeout(this.timer)
    this.timer = null
    this.$navigator.back()
  }
}
</script>
