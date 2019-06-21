import Vue from 'vue'
import Vuex from 'vuex'
import VuexPathify, { make } from 'vuex-pathify'

import identity from '@/services/identity'

Vue.use(Vuex)

export const state = {
  user: identity.currentUser()
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}

export const actions = {
  login ({ commit }) {
    identity.open('login')
    identity.on('login', user => {
      commit('SET_USER', user)
      console.log('✔ Successfully logged in!')
      identity.close()
    })
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
