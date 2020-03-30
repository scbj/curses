<template>
  <div class="stats">
    <h2 class="page-title">Répartitions</h2>
    <Balance :amount="balanceTotalAmount" label="Total">
      <TextButton class="filter-button" @click="onClick">non remboursé</TextButton>
    </Balance>
    <section class="balances-section">
      <div class="header">
        <span class="title">Soldes</span>
        <TextButton class="sort-button" @click="onClick">Trier par montant</TextButton>
      </div>
      <ul class="balance-list">
        <template v-for="balance in balances">
          <li class="balance-item" :key="balance._id">
            <span>6 dépenses</span>
            <span>Moi</span>
            <span>Montant</span>
            <Balance :amount="27" />
          </li>
        </template>
      </ul>
    </section>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import Balance from '@/components/Balance'
import TextButton from '@/components/TextButton'

export default {
  components: {
    Balance,
    TextButton
  },

  computed: {
    balanceTotalAmount: get('balance/totalAmount'),
    balances: get('balance/items'),
    selfBalance: get('balance/self'),
  },

  methods: {
    onClick () {
      console.log('clicked!')
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
    font-weight: 400;
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

.balance-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  border-radius: 8px;
  background: var(--background-color);
  box-shadow: 0 1px 4px -1px rgba(#000000, 16%);
  padding: 13px 15px;
  margin: 9px;
  margin-top: 22px;
}
</style>