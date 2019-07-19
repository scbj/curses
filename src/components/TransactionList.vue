<template>
  <section class="transaction-list">
    <h2 class="title">
      Transactions
    </h2>
    <ul class="list">
      <template v-for="(transaction, index) in sortedTransactions">
        <TransactionItem
          :key="index"
          :transaction="transaction"
        />
      </template>
    </ul>
  </section>
</template>

<script>
import TransactionItem from '@/components/TransactionItem'

import api from '@/services/api'
import { EventBus } from '@/reactivity/event-bus'

export default {
  components: {
    TransactionItem
  },

  data () {
    return {
      transactions: []
    }
  },

  computed: {
    sortedTransactions () {
      const compare = (a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        if (dateA < dateB) { return 1 }
        if (dateA > dateB) { return -1 }
        return 0
      }
      return this.transactions.slice(0).sort(compare)
    }
  },

  async mounted () {
    EventBus.$on('transaction.created', this.addTransaction)
    const transactions = await api('transaction.list')
    if (transactions) {
      this.transactions = transactions
    }
  },

  beforeDestroy () {
    EventBus.$off('transaction.created', this.addTransaction)
  },

  methods: {
    addTransaction (transaction) {
      this.transactions.push(transaction)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-gap: 28px;
  margin-top: 21px;
  margin-bottom: 120px;
}

.title {
  font-family: 'TT Commons';
  font-weight: 400;
  font-size: 28px;
  color: #323232;
}
</style>
