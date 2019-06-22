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
  }
}
