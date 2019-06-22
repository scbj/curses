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

export default {
  components: {
    TransactionItem
  },

  data () {
    return {
      transactions: [
        {
          label: 'Papier Toilette x16',
          date: "Aujourd'hui par Flavien",
          amount: '5,90 €'
        },
        {
          label: 'Bières (x10)',
          date: 'Hier par Romain',
          amount: '9,88 €'
        },
        {
          label: 'Sopalin (3 rouleaux)',
          date: '2 juin par Romain',
          amount: '2,60 €'
        },
        {
          label: 'Papier Toilette x8',
          date: '29 mai par Sacha',
          amount: '3,18 €'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-gap: 28px;
  margin-top: 21px;
}

.title {
  font-family: 'TT Commons';
  font-weight: 400;
  font-size: 28px;
  color: #323232;
}
</style>
