import Vue from 'vue'
import Router from 'vue-router'
import qs from 'query-string'

import store from '../store/'
import { appSetAuthorized } from '../store/common'
import { ROUTE_DEFAULT, ROUTE_AUTHENTICATE, ROUTE_AUTHENTICATED } from './route-names'

import Authentication from '../views/Authentication'
import Home from '../views/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: ROUTE_DEFAULT,
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) {
          next('/authenticate')
        } else {
          next()
        }
      }
    },
    {
      name: ROUTE_AUTHENTICATE,
      path: '/authenticate',
      component: Authentication
    },
    {
      name: ROUTE_AUTHENTICATED,
      path: '/authenticated',
      beforeEnter: (to, from, next) => {
        if (to.hash) {
          const parsed = qs.parse(to.hash)
          appSetAuthorized(parsed.access_token, +Date.now() + parseInt(parsed.expires_in, 10) * 1000, +Date.now())
          next('/')
        }
      }
    },
    // TODO: Improve
    { path: '*', component: Home }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, store.getters.isAuthenticated)
  next()
})

export default router
