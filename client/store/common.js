import {
  SET_UI_ERROR,
  CLEAR_UI_ERROR,
  SET_UI_LOADING,
  SET_UI_INITIALIZED,
  SET_AUTHENTICATION,
  SET_REQUEST_IN_PROGRESS,
  RESET_AUTHENTICATION,
} from './mutation-types'
import store from './'

const uiStartLoading = () => {
  store.commit(SET_UI_LOADING, true)
}

const uiStopLoading = () => {
  store.commit(SET_UI_LOADING, false)
}

const uiSetInitialized = () => {
  store.commit(SET_UI_INITIALIZED)
}

const uiSetError = err => {
  store.commit(SET_UI_ERROR, err)
}

const uiClearError = () => {
  store.commit(CLEAR_UI_ERROR)
}

const requestInProgress = stateSlice => {
  store.commit(SET_REQUEST_IN_PROGRESS, {
    stateSlice,
    status: true,
  })
}

const requestCompleted = stateSlice => {
  store.commit(SET_REQUEST_IN_PROGRESS, {
    stateSlice,
    status: false,
  })
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
  requestInProgress,
  requestCompleted,
  uiSetInitialized,
  uiStartLoading,
  uiStopLoading,
  uiSetError,
  uiClearError,
}
