<template>
  <section class="transaction-list">
    <h2 class="title">
      Transactions
    </h2>
    <ul class="list">
      <template v-for="(transaction, index) in transactions">
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

export default {
  components: {
    TransactionItem
  },

  data () {
    return {
      transactions: []
    }
  },

  async mounted () {
    const transactions = await api('transaction.list')
    if (transactions) {
      this.transactions = transactions
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-gap: 28px;
  margin-top: 21px;
  margin-bottom: 100px;
}

.title {
  font-family: 'TT Commons';
  font-weight: 400;
  font-size: 28px;
  color: #323232;
}
</style>
