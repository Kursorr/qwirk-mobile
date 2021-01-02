<template>
  <Page :actionBarHidden="true">
    <AbsoluteLayout height="120%" width="120%" backgroundColor="red">
      <Image src="~/assets/back.jpg"
             stretch="fill"
             ref="back"
             id="back"/>
      <Image src="~/assets/perso.png"
             id="perso"
             ref="perso"/>

      <!--<StackLayout id="test" ref="perso" :top="tx" :left="ty"></StackLayout>-->

    </AbsoluteLayout>
  </Page>
</template>

<script lang="ts">
import {
  AndroidSensorListener,
  AndroidSensors,
  SensorDelay,
} from 'nativescript-android-sensors'

import { Component, Vue } from 'vue-property-decorator'

function getAvg (items) {
  const total = items.reduce((acc, c) => acc + c, 0)
  return total / items.length
}

@Component
export default class TestParallax extends Vue {
  public message: string
  private androidSensors: AndroidSensors
  public sensorMaxFifoEventCount: string = ''
  public sensorData: string = ''
  public xarr: Array<number> = [0, 0, 0, 0, 0]
  public yarr: Array<number> = [0, 0, 0, 0, 0]

  public get tx(): number {
    return getAvg(this.xarr)
  }

  public get ty(): number {
    return getAvg(this.yarr)
  }

  constructor() {
    super()

    this.androidSensors = new AndroidSensors()

    const listener = new AndroidSensorListener({
      onSensorChanged: (result) => {
        // console.log('SensorChangedEvent', result)
        // result is being returned as a string currently
        const parsedData = JSON.parse(result)
        const rawSensorData = parsedData.data
        this.sensorData = rawSensorData.x
        // const sensor = parsedData.sensor
        // const time = parsedData.time

        // @ts-ignore
        this.$refs.perso.nativeView.animate({
          translate: {
            x: this.tx,
            y: this.ty
          }
        })

        // @ts-ignore
        this.$refs.back.nativeView.animate({
          translate: {
            x: 0,
            y: this.ty * 0.4
          }
        })

        this.xarr.shift()
        this.xarr.push(Math.round(rawSensorData.x * 100))

        this.yarr.shift()
        this.yarr.push(Math.round(rawSensorData.y * 100))
      },
      onAccuracyChanged: (sensor, accuracy) => {
        // console.log('Accuracy Changed', sensor, accuracy)
      },
    })

    this.androidSensors.setListener(listener)
  }

  public startLinearAcceleration() {
    // starting the acceleration sensor
    const acceleration = this.androidSensors.startSensor(
        // @ts-ignore
        android.hardware.Sensor.TYPE_LINEAR_ACCELERATION,
        SensorDelay.UI, 0)

    // checking if it supports FIFO
    const x = (acceleration as any).getFifoMaxEventCount()
    this.sensorMaxFifoEventCount = `Max Fifo Event Count: ${x}`

    // after 8 seconds we are stopping the acceleration sensor
    /*setTimeout(() => {
      this.androidSensors.stopSensor(acceleration)
      this.sensorData = 'Sensor has stopped!'
    }, 20000)*/
  }

  private mounted () {
    setTimeout(() => {
      this.startLinearAcceleration()
    }, 1000)
  }
}
</script>

<style>
  #back {
    width: 120%;
    height: 120%;
  }

  #perso {
    height: 70%;
    width: 70%;
    top: 280;
    left: 100;
  }

  /*#test {
    background: url("~/assets/perso.png") no-repeat;
    background-size: 440 850;
    top: 280;
    left: 90;
    height: 100%;
    width: 100%;
  }*/
</style>
