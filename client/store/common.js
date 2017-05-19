import {
  SET_UI_ERROR,
  SET_UI_LOADING,
  SET_AUTHENTICATION,
  RESET_AUTHENTICATION,
} from './mutation-types'
import store from './'

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
    requestedAt,
  })
}

const appResetAuthorized = () => {
  store.commit(RESET_AUTHENTICATION)
}

export {
  appSetAuthorized,
  appResetAuthorized,
  uiStartLoading,
  uiStopLoading,
  uiSetError,
  uiClearError,
}
