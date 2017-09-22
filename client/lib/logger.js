import Raven from 'raven-js'
import { isDev } from '../lib/env'

const info = isDev()
  ? console.info
  : ((...args) => Raven.captureMessage(...args, { level: 'info' }))()

const error = isDev()
  ? console.error
  : ((...args) => Raven.captureMessage(...args, { level: 'error' }))()

export { info, error }
