import Vue from 'vue'
import Router from 'vue-router'

import routes from '@/router/routes'
import { requiresAuth } from '@/middlewares/auth.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// We add the middleware so that all routes without exception go through the verification of authentication
router.beforeEach(requiresAuth)

export default router
