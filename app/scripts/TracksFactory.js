import { Tracks } from './Tracks'
import { Track } from './Track'
import { Speech } from './Speech'
import { TrackInfo } from './TrackInfo'

export class TracksFactory {
  static makeTracks (songs) {
    const story = songs
    const tracks = new Tracks(story.title, story.end)

    for (let track of story.characters) {
      const currentTrack = new Track(new TrackInfo(track.id, track.name, track.representativeImg, track.backgroundColor))

      for (let speech of track.speeches) {
        currentTrack.addSpeech(new Speech(speech.id, speech.start, speech.end, speech.row, speech.file))
      }

      tracks.add(currentTrack)
    }

    return tracks
  }
}
