import { make } from 'vuex-pathify'

import api from '@/services/api'

const state = {
  items: [],
  activeFilter: 'all'
}

const getters = {
  /**
   * Returns the unrefunded transactions.
   * @returns {Array}
   */
  unrefundedItems (state) {
    const unrefunded = item => item.refunded === false
    return state.items.filter(unrefunded)
  },

  /**
   * Returns the unrefunded transaction count.
   * @returns {Number}
   */
  unrefundedCount (state, getters) {
    return getters.unrefundedItems.length
  },

  /**
   * Returns a transaction list based on the active filter.
   * @returns {Array}
   */
  filteredItems (state, getters) {
    if (state.activeFilter === 'unrefunded') {
      return getters.unrefundedItems
    }
    return state.items
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

  async create ({ commit, dispatch }, payload) {
    /**
     * Add the supplement to the refund balance.
     * @param {Number} supplement
     */
    const updateBalance = supplement => {
      dispatch('balance/incrementSelf', { value: supplement }, { root: true })
    }
    const transaction = await api('transaction.create', payload)
    if (transaction && transaction._id) {
      commit('SET_ITEMS', [ transaction, ...state.items ])
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
