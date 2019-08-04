import { make } from 'vuex-pathify'

import api from '@/services/api'

const state = {
  items: []
}

const getters = {
  sortedItems (state) {
    const compare = (a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      if (dateA < dateB) { return 1 }
      if (dateA > dateB) { return -1 }
      return 0
    }
    return state.items.slice(0).sort(compare)
  }
}

const mutations = make.mutations(state)

const actions = {
  async list ({ commit }) {
    const transactions = await api('transaction.list')
    if (transactions && transactions.length) {
      commit('SET_ITEMS', transactions)
    }
  },

  async create ({ commit, rootState }, payload) {
    /**
     * Add the supplement to the refund balance.
     * @param {Number} supplement
     */
    const updateBalance = supplement => {
      const { amount } = rootState.balance
      commit('balance/SET_AMOUNT', amount + supplement, { root: true })
    }
    const transaction = await api('transaction.create', payload)
    if (transaction && transaction._id) {
      commit('SET_ITEMS', [ ...state.items, transaction ])
      updateBalance(transaction.amount)
      return true
    }
    return false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
