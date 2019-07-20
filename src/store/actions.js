import identity from '@/services/identity'
import router from '@/router'

function navigateToHomePage () {
  router.push({ name: 'home' })
}

export default {
  login ({ commit, state }) {
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
