import * as audio from 'nativescript-audio'

export class Speech {
  constructor (id, start, close, row, soundFile, amplitudes = []) {
    this.id = id
    this.start = start
    this.close = close
    this.row = row
    this.soundFile = soundFile
    this.isPlaying = false
    this.player = new audio.TNSPlayer()
    this.amplitudes = amplitudes
  }

  async playSpeech (player, song) {
    const playerOptions = {
      audioFile: song,
      loop: false
    }

    this.isPlaying = true
    await player.playFromFile(playerOptions)
  }

  async stopSpeech (player) {
    await player.pause()
  }
}
