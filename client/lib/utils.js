import * as uuid from 'uuid/v4'

const API_ERROR = 'API_ERROR'
const GENERAL_ERROR = 'GENERAL_ERROR'
const NETWORK_ERROR = 'NETWORK_ERROR'

const getRandom = () => uuid()

const createError = (type, userInitiated, sourceObject = null) => ({
  error: { type, userInitiated, sourceObject },
})

export { API_ERROR, GENERAL_ERROR, NETWORK_ERROR, getRandom, createError }
