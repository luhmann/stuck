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

export {
  mapArtist,
  mapTracks
}
