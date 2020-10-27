import { TrackInfo } from './TrackInfo'
import { Speech } from './Speech'

export class Track {
  constructor (info) {
    if (!(info instanceof TrackInfo)) {
      throw new SyntaxError("info params is not a valid TrackInfo instance")
    }

    this.info = info
    this.speeches = []
  }

  addSpeech (speech) {
    if (!(speech instanceof Speech)) {
      throw new SyntaxError("speech params is not a valid Speech instance")
    }

    // TODO: check speech start and close
    this.speeches.push(speech)
  }

  speechIndex (track, speech) {
    return this.speeches.findIndex(i => i.id === speech.id)
  }

  deleteSpeech (track, speech) {
    const findIndex = this.speechIndex(track, speech)
    this.speeches.splice(findIndex, 1)
  }

  addSpeechWithParams (id, start, close, row, soundFile, amplitudes) {
    this.addSpeech(new Speech(id, start, close, row, soundFile, amplitudes))
  }

  moveSpeeches (speeches) {
    let end = 0
    for (let i = 0; i < speeches.length; i++) {
      let r = speeches[i]
      let duration = r.duration
      if (end > r.start) {
        r.start = end
        r.close = end + duration
      }
      end = r.close
    }
  }

  findCurrentSpeech (currentTimecode) {
    const foundSpeeches = this.speeches.map((speech) => {
      if (currentTimecode >= speech.start && currentTimecode <= speech.close) {
        return speech
      }
      return null
    }).filter((speech) => {
      return speech !== null
    })

    return ('0' in foundSpeeches ? foundSpeeches[0] : null)
  }

}
