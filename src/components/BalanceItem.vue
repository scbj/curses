<template>
  <div class="balance-item" :style="{ backgroundColor: color }">
    <span class="owner">{{ data.owner }}</span>
    <span class="count">{{ count }} dépenses</span>
    <span class="amount-label">Montant</span>
    <Currency
      class="amount"
      :value="data.amount"
      :font-sizes="[ '36px', '29px' ]"
      :font-weights="[ 600, 500 ]"
    />
    <div class="graph">
      <slot />
    </div>
  </div>
</template>

<script>
import Currency from '@/components/Currency'

export default {
  components: {
    Currency
  },

  props: {
    color: {
      type: String,
      required: true
    },

    count: {
      type: Number,
      required: true
    },

    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.balance-item {
  color: white;
  background: var(--balance-item__background-color);
  border-radius: 8px;
  box-shadow: 0 1px 4px -1px rgba(#000000, 16%);
  display: grid;
  grid: auto 1fr repeat(2, auto) / repeat(2, 1fr);
  padding: 18px 13px;
  margin: 9px;
  margin-top: 22px;
}

.count {
  font-weight: 600;
  font-size: 18px;

  grid-row: 1;
  grid-column: 2;
  justify-self: flex-end;
  margin-bottom: 17px;
}

.owner {
  font-size: 18px;
  font-weight: 700;

  grid-row: 1;
}

.amount-label {
  font-weight: 500;
  font-size: 15px;

  grid-row: 3;
  grid-column: 1;
  margin-bottom: 4px;
}

.amount {
  grid-row: 4;
  grid-column: 1;
}

.graph {
  grid-row: 2 / span 3;
  grid-column: 2;
  justify-self: flex-end;
  align-self: flex-end;
}
</style>
