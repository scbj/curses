import identity from '@/services/identity'
import router from '@/router'

export default {
  login ({ commit }) {
    identity.open('login')
    identity.on('login', user => {
      commit('SET_USER', user)
      console.log('✔ Successfully logged in!')
      identity.close()
      router.push({ name: 'home' })
    })
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
