/* eslint-disable capitalized-comments */
const tools = require('../_config')

// const errorBadRequestFixture = require('../_fixtures/error-bad-request.json')
// const spotifyDownFixture = require('../_fixtures/error-spotify-down.json')
const initialResponse = require('../_fixtures/recent-tracks-full.json')
const pollingResponseOne = require('../_fixtures/recent-tracks-polling-one.json')
// const emptyResponseFixture = require('../_fixtures/recent-tracks-empty.json')

// const failingRequest400 = tools.createResponse(400, errorBadRequestFixture)

// const failingRequest500 = tools.createResponse(503, spotifyDownFixture)
const successfulRequestInitial = tools.createResponse(200, initialResponse)
const pollingRequestOne = tools.createResponse(200, pollingResponseOne)
// const emptyResponse = tools.createResponse(200, emptyResponseFixture)

module.exports = {
  path: '/v1/me/player/recently-played',
  cache: false,
  delay: tools.getDelay(),
  proxy: false,
  render: (req, res) => {
    if (req.query.after) {
      return pollingRequestOne(res)
    } else if (req.query.before) {
      return successfulRequestInitial(res)
      // return emptyResponse(res)
    }

    // return failingRequest400(res)
    // return failingRequest500(res)
  },
}
