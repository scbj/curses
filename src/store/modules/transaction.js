import { make } from 'vuex-pathify'

import api from '@/services/api'
import store from '@/store'

const state = {
  items: [],
  activeFilter: 'all',
  modal: {
    mode: 'create',
    currentTransaction: null
  }
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

const mutations = {
  ...make.mutations(state),

  cleanModalContext (state) {
    state.modal = {
      mode: 'create',
      currentTransaction: null
    }
  }
}

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
  },

  async update ({ commit, dispatch }, payload) {
    /**
     * Add the supplement to the refund balance.
     * @param {Number} supplement
     */
    const updateBalance = supplement => {
      return dispatch('balance/incrementSelf', { value: supplement }, { root: true })
    }
    const { status } = await api('transaction.update', payload)
    if (status === 204) {
      // We need to replace the old items array to a fresh new
      const items = state.items.slice()
      const item = items.find(item => item._id === payload._id)
      const oldAmount = item.amount
      Object.assign(item, payload)
      commit('SET_ITEMS', items)
      const newAmount = payload.amount
      if (oldAmount !== newAmount) {
        await updateBalance(newAmount - oldAmount)
      }
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
