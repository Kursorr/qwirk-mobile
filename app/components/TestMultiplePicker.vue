<template>
  <Page>
    <StackLayout>

      <Label style="text-align:center; margin-bottom: 10; font-size: 24;" text="Picker"></Label>
      <Button height="44" @tap="openImagePicker" text="Open ImagePicker"></Button>
      <Button height="44" @tap="openVideoPicker" text="Open VideoPicker"></Button>
      <Button height="44" @tap="openAudioPicker" text="Open AudioPicker"></Button>
      <Button height="44" @tap="openCustomFilesPicker" text="Open CustomFilePicker"></Button>

      <Label style="text-align:center; margin-top: 10; font-size: 24;" text="Capture"></Label>
      <Button height="44" @tap="imageCapture" text="Take Picture"></Button>
      <Button height="44" @tap="videoCapture" text="Record Video"></Button>
      <Button height="44" @tap="audioCapture" text="Record Audio"></Button>

      <Button text="Open modal" @tap="openModal" :textWrap="true" />

      <Image :src="selectedChoosenOne"/>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import { Application, Button, ShowModalOptions, ImageSource, Image } from '@nativescript/core'
import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker'
import {Component, Vue} from "vue-property-decorator"
declare const AVCaptureSessionPreset1920x1080, AVCaptureSessionPresetHigh, AVCaptureSessionPresetLow, kUTTypePDF, kUTTypeText

@Component
export default class TestMultiplePicker extends Vue {
  private selectedChoosenOne: null

  public openModal(args) {
    const mainView: Button = <Button>args.object;
    const option: ShowModalOptions = {
      context: {},
      closeCallback: () => { },
      fullscreen: true
    };
    mainView.showModal("modal-page", option);
  }

  /**
   * openImagePicker
   */
  public openImagePicker() {
    let t = this;
    let options: ImagePickerOptions = {
      android: {
        isCaptureMood: false,
        isNeedCamera: true,
        maxNumberFiles: 10,
        isNeedFolderList: true
      }, ios: {
        isCaptureMood: false,
        isNeedCamera: true,
        maxNumberFiles: 10,
      }
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openImagePicker(options);

    mediafilepicker.on("getFiles", async (res) => {
      console.log(res);
      let results = res.object.get('results');
      console.dir(results);

      if (results) {

        for (let i = 0; i < results.length; i++) {

          let result = results[i];

          let file = result.file;

          console.log(`this is a file : ${file}`);

          if (result.file && Application.ios && !options.ios.isCaptureMood) {
            // We can copy the image to app directory for futher proccess. This will create a new directory name "filepicker". So, after your work you can delete it for reducing memory use.
            /* let fileName = file.replace(/^.*[\/]/, '');
            mediafilepicker.copyPHImageToAppDirectory(result.rawData, fileName).then((res: any) => {
                console.dir(res);
            }).catch((e) => {
                console.dir(e);
            })*/

            // or can get UIImage to display
            /*mediafilepicker.convertPHImageToUIImage(result.rawData).then(res => {
                console.log(res);
            });*/
          } else if (result.file && Application.ios) {
            // So we have taken image & will get UIImage

            // We can copy it to app directory, if need
            let fileName = "myTmpImage.jpg";
            mediafilepicker.copyUIImageToAppDirectory(result.rawData, fileName).then((res: any) => {
              console.log('je ne suis pas ici')
              console.dir(res);
            }).catch(e => {
              console.dir(e);
            });
          } else {

            const img = new Image()
            img.src = file
            this.selectedChoosenOne = img.src

            console.log(this.selectedChoosenOne);
            const imgSource = await ImageSource.fromFile(this.selectedChoosenOne)
            console.log(imgSource)
          }

        }
      }
    });

    // for iOS iCloud downloading status
    mediafilepicker.on("exportStatus", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("error", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("cancel", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

  }

  /**
   * openVideoPicker
   */
  public openVideoPicker() {

    let allowedVideoQualities = [];

    if (Application.ios) {
      allowedVideoQualities = [AVCaptureSessionPreset1920x1080, AVCaptureSessionPresetHigh];  // get more from here: https://developer.apple.com/documentation/avfoundation/avcapturesessionpreset?language=objc
    }

    let options: VideoPickerOptions = {
      android: {
        isCaptureMood: false,
        isNeedCamera: true,
        maxNumberFiles: 2,
        isNeedFolderList: true,
        maxDuration: 20,

      },
      ios: {
        isCaptureMood: false,
      }
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openVideoPicker(options);

    mediafilepicker.on("getFiles", function (res) {

      let results = res.object.get('results');
      console.dir(results);

      if (results) {

        for (let i = 0; i < results.length; i++) {

          let result = results[i];
          console.dir(result);

          let file = result.file;

          console.log(file);
        }
      }

    });

    // for iOS iCloud downloading status
    mediafilepicker.on("exportStatus", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("error", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("cancel", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });
  }

  /**
   * audio
   */
  public openAudioPicker() {

    let options: AudioPickerOptions = {
      android: {
        isCaptureMood: false,
        isNeedRecorder: true,
        maxNumberFiles: 2,
        isNeedFolderList: true,
        maxSize: 102400 // Maximum size in bytes
      },
      ios: {
        isCaptureMood: false,
        maxNumberFiles: 5,
        audioMaximumDuration: 10,
      }
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openAudioPicker(options);

    mediafilepicker.on("getFiles", function (res) {

      let results = res.object.get('results');
      console.dir(results);

      if (results) {

        for (let i = 0; i < results.length; i++) {

          let result = results[i];
          console.log(result);

          if (result.file && Application.ios && !options.ios.isCaptureMood) {
            // We can copy the audio to app directory for futher proccess. This will create a new directory name "filepicker". So, after your work you can delete it for reducing memory use.

            let fileName = "tmpFile.m4a"; // use .m4a

            // copying file will require some time

            mediafilepicker.copyMPMediaFileToAPPDirectory(result.rawData, fileName).then((res) => {
              console.dir(res);
            }).catch((err) => {
              console.dir(err);
            });

          } else if (result.file && Application.ios && options.ios.isCaptureMood) {
            // So we have recorded file in APP directory

            console.log(result.file);
          }

        }
      }

    });

    mediafilepicker.on("error", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("cancel", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });
  }

  /**
   * openCustomFiles
   */
  public openCustomFilesPicker() {
    let extensions = [];

    if (Application.ios) {
      extensions = [kUTTypePDF, kUTTypeText]; // you can get more types from here: https://developer.apple.com/documentation/mobilecoreservices/uttype
    } else {
      extensions = ['txt', 'pdf'];
    }

    let options: FilePickerOptions = {
      android: {
        extensions: extensions,
        maxNumberFiles: 2
      },
      ios: {
        extensions: extensions,
        multipleSelection: true,
      }
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openFilePicker(options);

    mediafilepicker.on("getFiles", function (res) {

      let results = res.object.get('results');
      console.dir(results);

      if (results) {

        for (let i = 0; i < results.length; i++) {

          let result = results[i];
          console.log(result.file);

        }
      }

    });

    mediafilepicker.on("error", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("cancel", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });
  }

  /**
   * imageCapture
   */
  public imageCapture() {
    let options: ImagePickerOptions = {
      android: {
        isCaptureMood: true,
      }, ios: {
        isCaptureMood: true,
      }
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openImagePicker(options);

    mediafilepicker.on("getFiles", function (res) {
      let results = res.object.get('results');
      console.dir(results);
    });

    mediafilepicker.on("error", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("cancel", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });
  }

  /**
   * videoCapture
   */
  public videoCapture() {
    let allowedVideoQualities = [];

    if (Application.ios) {
      allowedVideoQualities = [AVCaptureSessionPreset1920x1080, AVCaptureSessionPresetHigh];  // get more from here: https://developer.apple.com/documentation/avfoundation/avcapturesessionpreset?language=objc
    }

    let options: VideoPickerOptions = {
      android: {
        isCaptureMood: true,
        maxDuration: 20,
        videoQuality: 1,
      },
      ios: {
        isCaptureMood: true,
        videoMaximumDuration: 10,
        allowedVideoQualities: allowedVideoQualities
      }
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openVideoPicker(options);

    mediafilepicker.on("getFiles", function (res) {
      let results = res.object.get('results');
      console.dir(results);
    });

    mediafilepicker.on("error", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("cancel", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });
  }

  /**
   * audioCapture
   */
  public audioCapture() {
    let options: AudioPickerOptions = {
      android: {
        isCaptureMood: true,
        maxSize: 102400 // Maximum size of recorded file in bytes. 5900 = ~ 1 second
      },
      ios: {
        isCaptureMood: true,
        maxNumberFiles: 5,
        audioMaximumDuration: 10,
      }
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openAudioPicker(options);

    mediafilepicker.on("getFiles", function (res) {
      let results = res.object.get('results');
      console.dir(results);
    });

    mediafilepicker.on("error", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on("cancel", function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });
  }
}

</script>
