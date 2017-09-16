/* eslint-disable capitalized-comments */
// const errorBadRequestFixture = require('../_fixtures/error-bad-request.json')
const spotifyDownFixture = require('../_fixtures/error-spotify-down.json')

// const failingRequest400 = res => res.status(400).send(errorBadRequestFixture)
const failingRequest500 = res => res.status(503).send(spotifyDownFixture)

module.exports = {
  path: '/v1/me/player/recently-played',
  cache: false,
  delay: false,
  proxy: false,
  render: (req, res) => {
    // return failingRequest400(res)
    return failingRequest500(res)
  },
}
