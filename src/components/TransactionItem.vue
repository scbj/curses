<template>
  <div class="transaction-item">
    <span class="label">{{ transaction.description }}</span>
    <span class="date">
      {{ transaction.date | calendar | capitalize }} par {{ username }}
    </span>
    <span class="amount">{{ transaction.amount | currency }}</span>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import { currency } from '@/filters/number'
import { calendar } from '@/filters/date'
import { capitalize } from '@/filters/string'

export default {
  filters: { currency, calendar, capitalize },

  props: {
    transaction: {
      type: Object,
      required: true
    }
  },

  computed: {
    username: get('username')
  }
}
</script>

<style lang="scss" scoped>
.transaction-item {
  background: white;
  border-radius: 6px;
  display: grid;
  grid-template-rows: repeat(2, 50%);
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "label amount"
    "date amount";
  grid-gap: 3px;
  padding: 12px 17px;
  box-shadow: 0 4px 8px rgba(#779189, 0.15);
}

.label {
  font-family: 'TT Commons';
  font-weight: 500;
  font-size: 18px;
  color: #323232;
  grid-area: label;
}

.date {
  font-family: 'TT Commons';
  font-weight: 500;
  font-size: 14px;
  color: #323232;
  opacity: 0.8;
  grid-area: date;
}

.amount {
  font-family: 'TT Commons';
  font-weight: 700;
  font-size: 18px;
  color: #323232;
  grid-area: amount;
  align-self: center;
}
</style>
