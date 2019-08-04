<template>
  <li
    class="transaction-item"
    :class="{
      refunded: transaction.refunded,
      own: isOwnTransaction
    }"
    @click="editTransaction"
  >
    <span class="label">{{ transaction.description }}</span>
    <span class="date">
      {{ transaction.date | calendar | capitalize }} par {{ owner }}
    </span>
    <Currency
      class="amount"
      :value="transaction.amount"
      :font-sizes="[ '20px', '17px' ]"
      :font-weights="[ 700, 600 ]"
      :sign="isOwnTransaction"
    />
  </li>
</template>

<script>
import { get } from 'vuex-pathify'

import Currency from '@/components/Currency'

import { currency } from '@/filters/number'
import { calendar } from '@/filters/date'
import { capitalize } from '@/filters/string'

export default {
  filters: { currency, calendar, capitalize },

  components: {
    Currency
  },

  props: {
    transaction: {
      type: Object,
      required: true
    }
  },

  computed: {
    username: get('auth/username'),

    isOwnTransaction () {
      return this.username === this.transaction.owner
    },

    owner () {
      return this.isOwnTransaction ? 'Moi' : this.transaction.owner
    }
  },

  methods: {
    editTransaction () {
      this.$router.push({ name: 'home.edit' })
    }
  }
}
</script>

<style lang="scss" scoped>
$easing: cubic-bezier(.165, .84, .44, 1);

.transaction-item {
  background: white;
  display: grid;
  grid-template-rows: repeat(2, 50%);
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "label amount"
    "date amount";
  grid-gap: 4px;
  padding: 15px 17px;
  transition: all .2s $easing;

  &.own {
    .amount {
      color: #08c79c
    }
  }

  &:active {
    opacity: .2;
  }
}

.label {
  font-weight: 600;
  font-size: 18px;
  grid-area: label;
}

.date {
  font-weight: 500;
  font-size: 15px;
  color: #6f798d;
  grid-area: date;
}

.amount {
  color: #16284c;
  grid-area: amount;
  align-self: center;
}
</style>
