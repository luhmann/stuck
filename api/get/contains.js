const tools = require('../_config')

const containsFull = require('../_fixtures/contains-full.json')
const containsOne = require('../_fixtures/contains-polling-one.json')

const containsFullResponse = tools.createResponse(200, containsFull)
const containsOneResponse = tools.createResponse(200, containsOne)

module.exports = {
  path: '/v1/me/tracks/contains',
  cache: false,
  delay: tools.getDelay(),
  proxy: false,
  collection: true,
  render: (req, res) => {
    if (req.query.ids && req.query.ids.split(',').length === 1) {
      return containsOneResponse(res)
    }

    return containsFullResponse(res)
  },
}
