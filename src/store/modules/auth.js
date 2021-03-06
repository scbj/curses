import { make } from 'vuex-pathify'

import identity from '@/services/identity'
import router from '@/router'

const state = {
  user: identity.currentUser()
}

const getters = {
  /**
   * Returns true if the user is authenticated.
   * @returns {Boolean}
   */
  isAuthenticated (state) {
    return !!state.user
  },

  username (state) {
    return state.user && state.user.user_metadata.full_name
  }
}

const mutations = make.mutations(state)

const actions = {
  login ({ commit, state }) {
    const navigateToHomePage = () => router.push({ name: 'home' })
    identity.open('login')
    identity.on('login', user => {
      commit('SET_USER', user)
      identity.close()
      navigateToHomePage()
    })
    identity.on('close', () => state.user && navigateToHomePage())
  },

  logout ({ commit }) {
    const updateUser = () => commit('SET_USER', identity.currentUser())
    const requestLogin = () => router.push({ name: 'login' })
    identity
      .logout()
      .then(updateUser)
      .then(requestLogin)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
