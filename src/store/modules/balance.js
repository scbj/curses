import { make } from 'vuex-pathify'

import api from '@/services/api'

const state = {
  amount: 0
}

const mutations = make.mutations(state)

const actions = {
  async fetch ({ commit }) {
    const { amount } = await api('balance.fetch')
    commit('SET_AMOUNT', amount)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
