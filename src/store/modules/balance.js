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
  selfAmount (state, getters) {
    const balance = getters.self
    if (balance && balance.amount) {
      return balance.amount
    }
    return 0
  },

  /**
   * Return the balance of the current user.
   * @returns {Object}
   */
  self (state, getters, rootState, rootGetters) {
    return state.items.find(balance => balance.owner === rootGetters['auth/username'])
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
  },

  incrementSelf ({ state, getters, commit, dispatch }, payload) {
    if (!getters.self) {
      return dispatch('list')
    }

    const balance = getters.self
    const otherBalances = state.items.filter(item => item.owner !== balance.owner)
    balance.amount += payload.value
    commit('SET_ITEMS', [ balance, ...otherBalances ])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
