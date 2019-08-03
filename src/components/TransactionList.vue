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
import { get } from 'vuex-pathify'

import TransactionItem from '@/components/TransactionItem'

export default {
  components: {
    TransactionItem
  },

  computed: {
    transactions: get('transaction/sortedItems')
  },

  async mounted () {
    this.$store.dispatch('transaction/list')
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
  font-weight: 400;
  font-size: 28px;
  color: #323232;
}
</style>
