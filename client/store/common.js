import {
  SET_UI_ERROR,
  SET_UI_LOADING,
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

const uiSetError = () => {
  store.commit(SET_UI_ERROR, true)
}

const uiClearError = () => {
  store.commit(SET_UI_ERROR, false)
}

const requestInProgress = stateSlice => {
  console.log('in request in progress')
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
  uiStartLoading,
  uiStopLoading,
  uiSetError,
  uiClearError,
}
