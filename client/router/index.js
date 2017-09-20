import Vue from 'vue'
import Router from 'vue-router'
import qs from 'query-string'

import * as logger from '../lib/logger'
import store from '../store/'
import { appSetAuthorized } from '../store/common'
import Authentication from '../views/Authentication'
import Home from '../views/Home'

import {
  ROUTE_DEFAULT,
  ROUTE_AUTHENTICATE,
  ROUTE_AUTHENTICATED,
} from './route-names'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: ROUTE_DEFAULT,
      beforeEnter: (to, from, next) => {
        if (Boolean(store.getters.isAuthenticated) === false) {
          next('/authenticate')
        } else {
          next()
        }
      },
    },
    {
      name: ROUTE_AUTHENTICATE,
      path: '/authenticate',
      component: Authentication,
    },
    {
      name: ROUTE_AUTHENTICATED,
      path: '/authenticated',
      beforeEnter: (to, from, next) => {
        if (to.hash) {
          const parsed = qs.parse(to.hash)
          if (parsed.state === store.state.authentication.authenticationState) {
            appSetAuthorized(
              parsed.access_token,
              Number(Date.now()) + parseInt(parsed.expires_in, 10) * 1000,
              Number(Date.now())
            )
            next('/')
          } else {
            // Something does not add up redirect to authentication
            logger.error('Authentication state info did not match', parsed)
            next('/authenticate')
          }
        }
      },
    },
    { path: '*', component: Home },
  ],
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
