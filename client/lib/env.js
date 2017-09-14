const isDev = () => process.env.NODE_ENV === 'development'

const isProd = () => process.env.NODE_ENV === 'production'

const POLLING_INTERVAL = 45000

export { isDev, isProd, POLLING_INTERVAL }
