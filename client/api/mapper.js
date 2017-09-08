import moment from 'moment'

const mapArtist = artist => ({
  id: artist.id,
  name: artist.name,
  href: artist.href,
})

const mapTracks = tracks =>
  tracks.map(item => ({
    id: item.track.id,
    date: item.played_at,
    album: item.track.album,
    artists: item.track.artists.map(mapArtist),
    images: item.track.album.images,
    previewUrl: item.track.preview_url,
    name: item.track.name,
    externalUrl: item.track.external_urls.spotify,
  }))

const mapArtistToId = artist => artist.id

const filterIsFresh = item => moment(item.expires).isAfter()

const reduceTracksContainedInLibrary = (trackIds, containsInfo) =>
  trackIds.reduce(
    (prev, curr, index) =>
      Object.assign({}, prev, {
        [trackIds[index]]: containsInfo[index],
      }),
    {}
  )

export {
  filterIsFresh,
  mapArtist,
  mapTracks,
  mapArtistToId,
  reduceTracksContainedInLibrary,
}
