<template>
  <ul class="transaction-list">
    <template v-for="(transaction, index) in transactions">
      <TransactionItem
        :key="index"
        :transaction="transaction"
      />
    </template>
  </ul>
</template>

<script>
import { get } from 'vuex-pathify'

import TransactionItem from '@/components/TransactionItem'

export default {
  components: {
    TransactionItem
  },

  computed: {
    transactions: get('transaction/filteredItems')
  },

  async mounted () {
    this.$store.dispatch('transaction/list')
  }
}
</script>

<style lang="scss" scoped>
.transaction-list {
  display: flex;
  flex-direction: column;
}
</style>
