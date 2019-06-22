import Vue from 'vue'
import Vuex from 'vuex'
import VuexPathify, { make } from 'vuex-pathify'

import identity from '@/services/identity'
import actions from '@/store/actions'

Vue.use(Vuex)

export const state = {
  user: identity.currentUser()
}

export const getters = {
  /**
 * Returns true if the user is authenticated.
 * @returns {Boolean}
 */
  isAuthenticated (state) {
    return !!state.user
  }
}

export const mutations = make.mutations(state)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    VuexPathify.plugin
  ]
})
