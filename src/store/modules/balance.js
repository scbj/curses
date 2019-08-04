import { make } from 'vuex-pathify'

import api from '@/services/api'

const state = {
  items: []
}

const getters = {
  /**
   * Return the amount of the balance of the current user.
   * @returns {Number}
   */
  selfAmount (state, getters, rootState, rootGetters) {
    const balance = state.items.find(balance => balance.owner === rootGetters['auth/username'])
    if (balance && balance.amount) {
      return balance.amount
    }
    return 0
  },

  /**
   * Returns the total sum of balances.
   * @returns {Number}
   */
  totalAmount (state) {
    return state.items.reduce((total, balance) => total + balance.amount, 0)
  }
}

const mutations = make.mutations(state)

const actions = {
  async list ({ commit }) {
    const balances = await api('balance.list')
    if (balances && balances.length) {
      commit('SET_ITEMS', balances)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
