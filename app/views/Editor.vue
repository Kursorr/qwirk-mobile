<template>
  <Page :actionBarHidden="true"
        ref="page"
        @loaded="loadedPage"
        @navigatingFrom="reset"
        @layoutChanged="layoutChange">

    <GridLayout columns="*" rows="*">
      <ScrollView :isUserInteractionEnabled="scroll">
        <StackLayout marginTop="5">
          <AbsoluteLayout width="100%"
                          height="100%">
            <StackLayout style.zIndex="9999"
                         width="100%">
              <StackLayout @pan="dragDropPlaybackMarker($event)"
                           width="100%">
                <Chronometer ref="chrono"
                             @timerChange="updateTimer"
                             :marginLeft="marginPlaybackMarker()"
                             :timecode="currentTrack"/>
              </StackLayout>

              <StackLayout ref="playbackMarker"
                           :marginLeft="marginPlaybackMarker()"
                           id="playbackMarker"/>
            </StackLayout>

            <GridLayout rows="auto, *" id="editor">
              <FlexboxLayout row="0"
                             ref="timeline"
                             @pan="dragDropTimeline($event)"
                             id="timeline">
                <StackLayout v-for="(item, index) in timeBar"
                             :key="index">
                  <Label :class="tickClass(item)"
                         ref="tick"
                         borderWidth="1"
                         borderColor="#000"/>
                </StackLayout>
              </FlexboxLayout>

              <GridLayout row="1"
                          :rows="'auto,'.repeat(tracks.elements.length)">
                <StackLayout
                    :row="index"
                    v-for="(track, index) in tracks.elements"
                    :key="index"
                    id="track"
                    :ref="track.info.id"
                    :width="tracksWidth">

                  <ContentView
                      horizontalAlignment="left"
                      height="100%">
                    <StackLayout
                        orientation="horizontal"
                        backgroundColor="#B3B3B2"
                        ref="row">
                      <AbsoluteLayout id="micro"
                                      ref="microphone">
                        <Label text="pic"
                               :src="track.info.picture"
                               ref="icon"
                               @pan="recordVoice($event, track)"
                               top="5"
                               left="5"
                               height="40"
                               backgroundColor="red"
                               width="35"/>

                        <Label text="mic"
                               left="25"
                               top="30"
                               backgroundColor="purple"
                               ref="iconChange"
                               height="52"
                               width="42"/>
                        <!--<Image :src="track.info.picture"
                                  ref="icon"
                                  @pan="recordVoice($event, track)"
                                  top="5"
                                  left="5"
                                  height="40"
                                  width="35"/>
                        <Image src="~/assets/images/icons/other/mic.svg"
                                  left="14"
                                  top="10"
                                  ref="iconChange"
                                  height="52"
                                  width="42"/>-->
                      </AbsoluteLayout>

                      <AbsoluteLayout backgroundColor="#fff"
                                      height="80"
                                      :width="tracksWidth">
                        <StackLayout v-for="(speech, index) in track.speeches"
                                     :key="index"
                                     @pan="dragDropSpeech($event, track, speech)"
                                     @doubletap="deleteSpeech($event, track, speech)"
                                     :width="(speech.close - speech.start) * diffSpace"
                                     :left="marginLeft(track, speech)"
                                     :backgroundColor="track.info.backgroundColor"
                                     :ref="track.info.name"
                                     id="speech">
                          <Label :text="`${speech.start} - ${speech.close}`"
                                 fontSize="12"/>
                          <Label :text="speech.id"></Label>
                        </StackLayout>
                      </AbsoluteLayout>

                    </StackLayout>
                  </ContentView>

                </StackLayout>
              </GridLayout>
            </GridLayout>
          </AbsoluteLayout>

          <FlexboxLayout class="infos">
            <Label :text="tracks.title" @tap="startTour"/>

            <Label text="Settings" @tap="openOptions"/>
            <Label text="play"
                   ref="firstStep"
                   @tap="play"
                   v-if="!playOrPauseIcon"
                   height="45"
                   width="45"/>
            <Label text="stop"
                   @tap="stop"
                   v-if="playOrPauseIcon"
                   height="45"
                   width="45"/>
            <Label text="reset"
                   @tap="reset"
                   height="45"
                   width="45"/>

            <Label text="recording..." v-if="recording"/>

            <!--<Image src="~/assets/images/icons/other/play.svg"
                   ref="firstStep"
                   @tap="play"
                   v-if="!playOrPauseIcon"
                   height="45"
                   width="45"/>

            <Image src="~/assets/images/icons/other/pause.svg"
                      @tap="stop"
                      v-if="playOrPauseIcon"
                      height="45"
                      width="45"/>-->
          </FlexboxLayout>
        </StackLayout>
      </ScrollView>
      <Copilot
          v-if="steps.length > 0"
          :steps="steps"
          :animationDuration="animationDuration"
          :labels="labels"
          :tooltipStyle="tooltipStyle"
          :overlayColor="overlayColor"
          :tooltipBackgroundColor="tooltipBackgroundColor"
          :numberBackgroundColor="tooltipBackgroundColor"
          :numberAccentColor="accentColor"
          ref="copilot"/>
    </GridLayout>
  </Page>
</template>

<script>
// Internal package
import Chronometer from '@/components/Chronometer'
import Recording from '@/components/Recording'

import { TracksFactory } from '@/scripts/TracksFactory'
import story from '@/data/story.json'
import utils from '@/api/utils'

// External package
import { mapActions } from 'vuex'

import * as audio from 'nativescript-audio'

import { Screen, knownFolders, isAndroid } from '@nativescript/core'
// import Options from '../components/Modal/Options'

function randomName() {
  return `rnd${utils.generateUUIDv4()}.mp4`
}

const onQueryEvent = function (result) {
  if (!result.error) {
    console.log('Event Type: ' + result.type)
    console.log('Key: ' + result.key)
    console.log('Value: ' + JSON.stringify(result.value))
    console.log('Children: ' + JSON.stringify(result.children))
  }
}

const tracks = TracksFactory.makeTracks(story)

const DOWN = 1
const PANNING = 2
const UP = 3

// Speech / timeline work
const STARTPOS = 80 // DPI
const DIFFTIME = 1 // time

export default {
  components: {
    Chronometer,
    Recording
  },
  data () {
    return {
      saveTrackFirstValue: 0,
      scroll: true,
      tracks,
      tracksWidth: 0,
      timeBar: [],
      recording: false,
      speech: null,
      margeTimer: 0,
      prevPlayback: 0,
      audioFolder: null,
      recorder: null,
      fileName: null,
      playOrPauseIcon: false,
      resetBarPosition: 0, // Position of the playback tracker when opening the view
      tickSpace: 0, // Space between two bar of the timeline
      // Copilot - Tutorial section
      steps: [],
      animationDuration: 300,
      labels: {
        skip: 'Skip',
        previous: 'Previous',
        next: 'Next',
        finish: 'Finish'
      },
      tooltipStyle: {
        fontFamily: 'Avenir-Light',
        tooltipFontSize: 14,
        tooltipTextColor: 'black',
        buttonFontSize: 14,
        accentColor: 'green'
      },
      overlayColor: 'rgba(0, 0, 0, 0.4)',
      tooltipBackgroundColor: 'white',
      accentColor: 'green'
    }
  },
  computed: {
    diffSpace () {
      return this.tickSpace
    },
    tracksWidth () {
      return this.trackWidth
    },
    diffTime () {
      return DIFFTIME
    },
    startPos () {
      return STARTPOS
    },
    tickClass () {
      return (item) => {
        return item % 5 === 0 ? 'big' : 'little'
      }
    },
    steps () {
      return this.steps
    },
    currentTrack () {
      return ((this.prevPlayback === 0) ? this.tracks.current : this.$trackCurrent)
    }
  },
  methods: {
    ...mapActions({
      setActivityIndicator: 'activityIndicator/setInsideActivityIndicator'
    }),
    generateTimeBar (startTimecode) {
      let tab = []
      for (let i = startTimecode; i < 200 + startTimecode; i += 1) {
        tab.push(i)
      }
      this.timeBar = tab
    },
    marginLeft (track, speech) {
      return speech.start * this.diffSpace - this.tracks.begin * this.diffSpace
    },
    marginPlaybackMarker () {
      let bar = this.tracks.current - this.tracks.begin
      let mt = this.margeTimer

      if (bar < 0) {
        bar = 0
        mt = 0
      }

      return this.resetBarPosition +
          (bar * this.diffSpace * 2) +
          (mt * this.diffSpace * 2)
    },
    dragDropSpeech (args, track, speech) {
      this.$refs.row[track.info.id].nativeView.width = this.tracksWidth
      const findIndex = this.tracks.elements[track.info.id].speechIndex(track, speech)

      this.speech = this.$refs[track.info.name][findIndex].nativeView
      this.scroll = false

      if (args.state === DOWN) {
        this.prevDeltaX = 0
      } else if (args.state === PANNING) {
        this.speech.translateX += args.deltaX - this.prevDeltaX
        this.prevDeltaX = args.deltaX
      } else if (args.state === UP) {
        const newPos = Math.round(this.speech.getLocationOnScreen().x) - this.startPos
        const newTime = Math.round(this.tracks.begin + ((newPos * this.diffTime) / this.diffSpace))

        const diff = newTime - speech.start

        const time = speech.close - speech.start

        speech.start += diff
        speech.close += diff

        // Allow to reset the position if the speech is too much as the left
        if ((speech.start < 0 && speech.close < 0) || speech.start < 0) {
          speech.start = 0
          speech.close = time
        }

        // Allow to reset the position if the speech is too much as the right
        if ((speech.start > this.tracks.close && speech.close > this.tracks.close) || speech.close >
            this.tracks.close) {
          speech.start = this.tracks.close - time
          speech.close = this.tracks.close
        }

        this.speech.translateX = 0
        this.scroll = true
      }
    },
    dragDropTimeline (args) {
      this.scroll = false

      if (args.state === DOWN) {
        this.prevDeltaX = 0
      } else if (args.state === PANNING) {
        const timeCode = this.timecodeWithDelta(args)
        const begin = timeCode - this.prevDeltaX
        this.tracks.begin += begin
        this.prevDeltaX = timeCode

        if (this.tracks.begin < 0) {
          this.tracks.begin = 0
        }

        if (this.tracks.begin > this.tracks.close - 38) {
          this.tracks.begin = this.tracks.close - 38
        }

        this.generateTimeBar(this.tracks.begin)
      } else if (args.state === UP) {
        this.scroll = true
      }
    },
    dragDropPlaybackMarker (args) {
      this.scroll = false

      const chrono = this.$refs.chrono.nativeView
      const time = this.$refs.playbackMarker.nativeView

      if (args.state === DOWN) {
        this.prevDeltaX = 0
        this.stop()
      } else if (args.state === PANNING) {
        chrono.translateX += args.deltaX - this.prevDeltaX
        time.translateX += args.deltaX - this.prevDeltaX
        this.prevDeltaX = args.deltaX
      } else if (args.state === UP) {
        this.scroll = true

        const newPos = Math.round(time.getLocationOnScreen().x) - this.startPos
        const newTime = Math.round((newPos * this.diffTime) / this.diffSpace)
        this.tracks.current = this.tracks.begin + newTime

        if (this.tracks.current < this.tracks.begin)
          this.tracks.current = this.tracks.begin

        if (this.tracks.current > this.tracks.close)
          this.tracks.current = this.tracks.close

        time.translateX = 0
        chrono.translateX = 0

        // Allow to replay speeches after moving the playback tracker
        this.tracks.resetSpeeches()
      }
    },
    timecodeWithDelta(args) {
      return Math.trunc(Math.trunc(args.deltaX) * -1 / this.diffSpace)
    },
    updateTimer (newTimer, f) {
      this.tracks.current = Math.trunc(newTimer / 10)
      this.margeTimer = (newTimer % 10) / 10

      const actualSpeeches = this.tracks.findCurrentSpeeches()
      console.log(actualSpeeches)

      // Fix bug, than when we move the playbacktracker inside a speech
      // that shouldn't play it without tapping on the play button
      if (f === false || f === undefined && this.playOrPauseIcon === false)
        return

      for (let actualSpeech of actualSpeeches) {
        if (!actualSpeech.isPlaying) {
          actualSpeech.playSpeech(actualSpeech.player, actualSpeech.soundFile)
          this.tracks.getPlayingSpeech(actualSpeech)

          console.log(actualSpeech.isPlaying)
          console.log(actualSpeech.soundFile)
          console.log(actualSpeech.id)
          console.log(actualSpeech.start)
          console.log(actualSpeech.close)

        }
      }
    },
    async recordVoice (args, track) {
      if (args.state === DOWN) {
        /*await this.$showModal(Recording)
        this.setActivityIndicator(true)*/
        await this.record()
      } else if (args.state === UP) {
        this.setActivityIndicator(false)
        await this.endRecord(track.info.id)
      }
    },
    async record () {
      if (!audio.TNSRecorder.CAN_RECORD()) {
        alert('This device cannot record audio.')
        return
      }

      this.recorder = new audio.TNSRecorder()
      this.fileName = randomName()
      let androidFormat
      let androidEncoder

      if (isAndroid) {
        androidFormat = 2
        androidEncoder = 3
      }

      let options = {
        filename: this.audioFolder.path + '/' + this.fileName,
        format: androidFormat,
        encoder: androidEncoder,
        infoCallback: info => {},
        errorCallback: e => {}
      }

      await this.recorder.start(options)
      this.recording = true
    },
    async endRecord (id) {
      await this.recorder.stop()
      this.recording = false

      let player = new audio.TNSPlayer()
      const path = `${this.audioFolder.path}/${this.fileName}`

      await player.playFromFile({
        audioFile: path
      })

      const duration = await player.getAudioTrackDuration()
      const time = Math.ceil(duration / 1000)

      const length = this.tracks.elements[id].speeches.length
      const trackId = this.tracks.elements[id]

      const newId = Math.floor(Math.random() * Math.floor(1000))

      const newSpeech = {
        id: newId,
        row: trackId.info.id,
        start: this.tracks.current,
        close: this.tracks.current + time,
        soundFile: path,
        amplitudes: []
      }

      if (length === 0) {
        trackId.addSpeechWithParams(
            0,
            newSpeech.start,
            newSpeech.close,
            trackId,
            newSpeech.soundFile,
            []
        )
        return
      }

      this.tracks.close += time

      let idx = 0
      for (let i = 0; i < length; i++) {
        let r = trackId.speeches[i]
        r.duration = r.close - r.start
        let durationMedian = (r.duration / 2)
        let median = r.start + durationMedian
        if (newSpeech.start < median) {
          break
        }
        idx++
      }

      trackId.speeches.splice(idx, 0, newSpeech)
      trackId.moveSpeeches(trackId.speeches)

      this.tracks.current = newSpeech.close

      await this.recorder.dispose()
    },
    deleteSpeech (args, track, speech) {
      // Double tap is better for delete a speech because I get collision with
      // the panning of the speech (sometimes)

      const confirmOptions = {
        title: 'Delete speech',
        message: 'Do you want to delete this sound?',
        okButtonText: 'Yes',
        cancelButtonText: 'No'
      }

      confirm(confirmOptions).then(result => {
        if (result)
          this.tracks.elements[track.info.id].deleteSpeech(track, speech)
      })
    },
    async play () {
      this.playOrPauseIcon = true
      this.$refs.chrono.start(this.tracks.current)
    },
    stop () {
      this.$refs.chrono.stop()
      this.tracks.stopSpeeches()
      this.playOrPauseIcon = false
      this.tracks.current += Math.round(this.margeTimer)
      this.margeTimer = 0
    },
    loadedPage () {
      // this.$orientation.setCurrentOrientation('landscape')
      this.generateTimeBar(0)

      this.steps = [
        {
          name: 'Play button',
          text: 'This is the Play and Stop button.',
          order: 1,
          target: this.$refs.firstStep.nativeView,
          animated: true,
          isFirstStep: true
        },
        {
          name: 'Chronometer',
          text: 'Play wherever you want by moving it wherever you want.      ',
          order: 2,
          target: this.$refs.chrono.nativeView,
          animated: true
        },
        {
          name: 'Timeline',
          text: 'Move it left to right to see the start and the end of your story.',
          order: 3,
          target: this.$refs.timeline.nativeView,
          animated: true
        },
        {
          name: 'iconChange',
          text: 'Tap to change your animal',
          order: 4,
          target: this.$refs.iconChange[0].nativeView,
          animated: true
        },
        {
          name: 'Icon',
          text: 'Press to record your voice',
          order: 5,
          target: this.$refs.icon[0].nativeView,
          animated: true
        },
        {
          name: 'Speech',
          text: 'Move your speech where you want it to start, if you want to delete it, double tap on it !',
          order: 6,
          target: this.$refs['Iron Man'][0].nativeView,
          animated: true,
          isLastStep: true
        }
      ]
    },
    startTour () {
      this.$refs.copilot.start()
    },
    async reset () {
      this.$refs.chrono.reset()
      await this.tracks.reset()
      this.tracks.current = 0
      this.playOrPauseIcon = false
    },
    layoutChange () {
      setTimeout(() => {
        // Should fix the playback tracker position for every phone.
        const timeline = this.$refs.timeline.nativeView
        const playBackMarker = this.$refs.playbackMarker.nativeView
        const x = Math.ceil(playBackMarker.getLocationRelativeTo(timeline).x)

        const value = -(x * 2)

        if (this.saveTrackFirstValue === 0) {
          this.saveTrackFirstValue = value
          this.resetBarPosition = this.saveTrackFirstValue
        }

        // get the diffSpace value
        // That allow us to move the playback tracker between each ticks of the timeline correctly
        const firstTick = this.$refs.tick[0].nativeView
        const secondTick = this.$refs.tick[1].nativeView

        this.tickSpace = -firstTick.getLocationRelativeTo(secondTick).x

        this.tracksWidth = Screen.mainScreen.widthDIPs - 8
      }, 500)
    },
    openOptions () {
      // const fullscreen = true
      // this.$showBottomSheet(Options, fullscreen)
    }
  },
  created () {
    this.audioFolder = knownFolders.currentApp().getFolder('recordings')
  }
}
</script>

<style lang="scss" scoped>
  // @import '../colors.scss';

  .infos {
    width: 90%;
    align-items: center;
    justify-content: space-between;
    padding: 15 0;
  }

  StackLayout#playbackMarker {
    width: 3;
    height: 261;
    background-color: #AAB1C0;
  }

  GridLayout#editor {
    margin-top: 35;

    FlexboxLayout#timeline {
      align-items: flex-end;
      margin-left: 80;
      background-color: transparent;
      border-bottom-width: 1;
      border-bottom-color: #000;
    }

    .big {
      margin-right: 6;
      height: 20;
    }

    .little {
      margin-right: 6;
      height: 10;
    }

    AbsoluteLayout#micro {
      width: 54;
      height: 54;
      margin: 0 10;
      background-color: #FFF;
      border-radius: 50%;
    }

    StackLayout#track {
      height: 75;
      border-color: #000;
      border-width: 1;
      margin-bottom: 5;
      margin-left: 5;

      StackLayout#speech {
        height: 80;
        top: 0;
      }
    }
  }
</style>
