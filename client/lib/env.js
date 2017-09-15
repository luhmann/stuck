const isDev = () => process.env.NODE_ENV === 'development'

const isProd = () => process.env.NODE_ENV === 'production'

const ELAPSED_UPDATE_INTERVAL = 60000
const POLLING_INTERVAL = 45000

export { isDev, isProd, ELAPSED_UPDATE_INTERVAL, POLLING_INTERVAL }
