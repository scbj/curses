<template>
  <section class="refund-balance">
    <h3 class="label">
      Solde de remboursement :
    </h3>
    <span
      class="amount"
      :class="{ negative: isNegative }"
    >
      <em>{{ sign }} {{ Math.abs(amount) | currency }}</em> €
    </span>
  </section>
</template>

<script>
import { get } from 'vuex-pathify'

import { currency } from '@/filters/number'

export default {
  filters: { currency },

  computed: {
    amount: get('balance/amount'),

    isNegative () {
      return this.amount < 0
    },

    sign () {
      return this.isNegative ? '-' : '+'
    }
  },

  async mounted () {
    this.$store.dispatch('balance/fetch')
  }
}
</script>

<style lang="scss" scoped>
.label {
  font-family: 'TT Commons';
  font-weight: 500;
  font-size: 18px;
  color: #323232;
}

.amount {
  font-family: 'TT Commons';
  font-weight: 300;
  font-size: 52px;
  color: #23a665;
  display: block;
  margin-top: 12px;

  &.negative {
    color: #e6402c;
  }

  > em {
    font-weight: 600;
  }
}
</style>
