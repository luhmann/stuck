import Vue from 'vue'
import Router from 'vue-router'
import qs from 'query-string'

import store from '../store/'
import { appSetAuthorized } from '../store/common'

import Authentication from '../views/Authentication'
import Home from '../views/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) {
          next('/authenticate')
        } else {
          next()
        }
      }
    },
    {
      name: 'authenticate',
      path: '/authenticate',
      component: Authentication
    },
    {
      name: 'authenticated',
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
