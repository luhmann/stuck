import store from './'
import { SET_UI_ERROR, SET_UI_LOADING, SET_AUTHENTICATION } from './mutation-types'

const uiStartLoading = () => {
  store.commit(SET_UI_LOADING, true)
}

const uiStopLoading = () => {
  store.commit(SET_UI_LOADING, false)
}

const uiSetError = () => {
  store.commit(SET_UI_ERROR, true)
}

const uiClearError = () => {
  store.commit(SET_UI_ERROR, false)
}

const appSetAuthorized = (token, expires, requestedAt) => {
  store.commit(SET_AUTHENTICATION, {
    token,
    expires,
    requestedAt
  })
}

export {
  appSetAuthorized,
  uiStartLoading,
  uiStopLoading,
  uiSetError,
  uiClearError
}
