import moment from 'moment'

const mapArtist = (artist) => ({
  id: artist.id,
  name: artist.name,
  href: artist.href
})

const mapTracks = (tracks) => (
  tracks.map((item) => ({
    id: item.track.id,
    date: item.played_at,
    artists: item.track.artists.map(mapArtist),
    name: item.track.name
  }))
)

const mapArtistToId = artist => artist.id

const mapTracksToArtistIds = (tracks) => (
  tracks.reduce((prev, item) => [...prev, ...item.artists.map(mapArtistToId)], [])
)

const filterIsFresh = item => moment(item.expires).isAfter()

const reduceToKeyedArtists = artists => (
  artists.reduce((prev, artist) => {
    const artistWithExpiration = Object.assign({}, artist, { expires: moment().add(1, 'day').valueOf() })
    return Object.assign({}, prev, { [artist.id]: artistWithExpiration })
  },
    {}
  )
)

export {
  filterIsFresh,
  mapArtist,
  mapTracks,
  mapArtistToId,
  mapTracksToArtistIds,
  reduceToKeyedArtists
}
