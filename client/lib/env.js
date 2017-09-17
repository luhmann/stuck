const isDev = () => process.env.NODE_ENV === 'development'

const isProd = () => process.env.NODE_ENV === 'production'

const APP_NAME = 'stuck'
const ELAPSED_UPDATE_INTERVAL = 60000
const POLLING_INTERVAL = 45000
const RECENT_TRACKS_BATCH_SIZE = 49
const USE_MOCK_API = false
const MOCK_SERVER_BASE_URL = 'http://svo.dev:4444'

export {
  isDev,
  isProd,
  APP_NAME,
  ELAPSED_UPDATE_INTERVAL,
  MOCK_SERVER_BASE_URL,
  POLLING_INTERVAL,
  RECENT_TRACKS_BATCH_SIZE,
  USE_MOCK_API,
}
