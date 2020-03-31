<template>
  <div class="stats">
    <h2 class="page-title">
      Répartitions
    </h2>
    <Balance :amount="balanceTotalAmount" label="Total">
      <TextButton class="filter-button" @click="onClick">
        non remboursé
      </TextButton>
    </Balance>
    <section class="balances-section">
      <div class="header">
        <span class="title">Soldes</span>
        <TextButton class="sort-button" @click="onClick">
          Trier par pertinence
        </TextButton>
      </div>
      <ListView class="balance-list" :items="sortedBalances">
        <template v-slot:item-template="{ item }">
          <BalanceItem :data="item" :color="getColor(item, sortedBalances)" />
        </template>
      </ListView>
    </section>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import Balance from '@/components/Balance'
import BalanceItem from '@/components/BalanceItem'
import ListView from '@/components/ListView'
import TextButton from '@/components/TextButton'

export default {
  name: 'Stats',

  components: {
    Balance,
    BalanceItem,
    ListView,
    TextButton
  },

  computed: {
    balanceTotalAmount: get('balance/totalAmount'),
    balances: get('balance/items'),
    selfBalance: get('balance/self'),
    username: get('auth/username'),

    sortedBalances () {
      return this.balances.slice().sort((a, b) => {
        if (a.owner === this.username) return -1 // -1
        return b.owner === this.username // 1 or 0
      })
    }
  },

  methods: {
    onClick () {
      console.log('clicked!')
    },

    getColor (item, items) {
      if (item.owner === this.username) return '#08c79c'
      const others = items.filter(x => x.owner !== this.username)
      const maxAmount = Math.max(...others.map(x => x.amount))
      if (item.amount === maxAmount) return '#fbc64b'
      return '#4b60fb'
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-weight: 800;
  font-size: 38px;
  align-self: center;
}

.stats {
  display: grid;
  grid-template-columns: auto;
  gap: 18px;
  padding-bottom: 70px;
}

.page-title {
  margin-top: 52px;
  margin-left: 17px;
}

.balance {
  align-items: flex-start;
  margin: 0 17px;
  margin-top: 8px;

  .filter-button {
    margin-left: 9px;
  }
}

.balances-section {
  margin-top: 20px;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 17px;

    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
}

.balance-list {
  --balance-item__background-color: #08c79c;
}
</style>
