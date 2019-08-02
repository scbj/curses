import Vue from 'vue'
import Router from 'vue-router'

import routes from '@/router/routes'
import { requiresAuth } from '@/router/middlewares/auth.js'
import { requiresStandaloneMode } from '@/router/middlewares/pwa.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  // Automatically adds the specified class when a route matches that of a router-link
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes
})

// We add the middleware so that all routes without exception go through the verification of authentication
router.beforeEach(requiresAuth)
router.beforeEach(requiresStandaloneMode({ name: 'install' }))

export default router
