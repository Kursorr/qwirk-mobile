<template>
  <FlexboxLayout id="chrono">
    <Label :text="time"/>
  </FlexboxLayout>
</template>

<script>
  let timeBegan = null
  let timeStopped = null
  let stoppedDuration = 0
  let started = null
  let running = false

  export default {
    props: {
      timecode: Number
    },
    watch: {
      timecode (newVal) {
        if (this.timeElapsed === undefined) {
          this.begin = newVal
          this.timeElapsed = new Date(newVal * 1000)
          this.$emit('timerChange', newVal * 10, false)
          this.showTime()
          return false
        }

        const timeElapsedSecond = Math.trunc(this.timeElapsed.getTime() / 1000)

        if (timeElapsedSecond !== newVal) {
          this.begin = newVal
          this.timeElapsed = new Date(newVal * 1000)
          this.$emit('timerChange', newVal * 10)
          this.showTime()

          if (!running) this.stop()
          else this.start()
        }
      }
    },
    data () {
      return {
        time: '00.00.00',
        begin: this.timecode,
        timeElapsed: undefined
      }
    },
    methods: {
      clockRunning () {
        let currentTime = new Date()
        this.timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
        this.showTime()

        let time = this.timeElapsed.getTime() / 100
        this.$emit('timerChange', time)
      },
      showTime () {
        let hour = this.timeElapsed.getUTCHours()
        let min = this.timeElapsed.getUTCMinutes()
        let sec = this.timeElapsed.getUTCSeconds()

        this.time =
          this.zeroPrefix(hour, 2) + ':' +
          this.zeroPrefix(min, 2) + ':' +
          this.zeroPrefix(sec, 2)
      },
      zeroPrefix (num, digit) {
        let zero = ''
        for (let i = 0; i < digit; i++) {
          zero += '0'
        }

        return (zero + num).slice(-digit)
      },
      start (timecode) {
        if (running) return

        timeBegan = new Date(Date.now() - timecode * 1000)
        started = setInterval(this.clockRunning, 100)

        running = true
      },
      stop () {
        clearInterval(started)
        running = false
      },
      reset () {
        clearInterval(started)
        running = false
        this.time = '00.00.00'
        this.timeElapsed = undefined

        timeBegan = null
        timeStopped = null
        stoppedDuration = 0
        started = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  #chrono {
    justify-content: center;
    background-color: #AAB1C0;
    width: 90;
    padding: 5 0;
    border-width: 0;
    border-radius: 10;

    Label {
      color: #FFF;
    }
  }
</style>
