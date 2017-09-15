const isDev = () => process.env.NODE_ENV === 'development'

const isProd = () => process.env.NODE_ENV === 'production'

const ELAPSED_UPDATE_INTERVAL = 60000
const POLLING_INTERVAL = 45000
const RECENT_TRACKS_BATCH_SIZE = 50

export {
  isDev,
  isProd,
  ELAPSED_UPDATE_INTERVAL,
  POLLING_INTERVAL,
  RECENT_TRACKS_BATCH_SIZE,
}
