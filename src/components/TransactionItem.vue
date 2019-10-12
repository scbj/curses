<template>
  <!-- @touchstart="dragStart"
    @touchend="dragEnd"
    @touchmove="drag"
    @mousedown="dragStart"
    @mouseup="dragEnd"
    @mousemove="drag"
    :style="translateStyle" -->
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

  data () {
    return {
      active: false,
      currentX: 0,
      initialX: 0
    }
  },

  computed: {
    username: get('auth/username'),

    isOwnTransaction () {
      console.log('TCL: isOwnTransaction -> this.transaction', this.transaction)
      return this.username === this.transaction.owner
    },

    owner () {
      return this.isOwnTransaction ? 'Moi' : this.transaction.owner
    },

    translateStyle () {
      return {
        'transform': `translateX(${this.currentX}px)`
      }
    }
  },

  methods: {
    editTransaction () {
      // An user can only edit his own non-refunded  transactions
      if (this.transaction.refunded === false && this.transaction.owner === this.$store.get('auth/username')) {
        this.$store.set('transaction/modal@currentTransaction', this.transaction)
        this.$router.push({ name: 'home.edit' })
      }
    },

    dragStart (e) {
      const { clientX } = e.type === 'touchstart' ? e.touches[0] : e
      this.initialX = clientX
      this.active = true
    },

    dragEnd () {
      this.currentX = 0

      this.active = false
    },

    drag (e) {
      if (this.active) {
        e.preventDefault()

        const { clientX } = e.type === 'touchmove' ? e.touches[0] : e
        this.currentX = clientX - this.initialX
      }
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
  grid-column-gap: 12px;
  padding: 15px 17px;
  user-select: none;
  cursor: pointer;
  transition: all .16s $easing;

  &.own {
    .amount {
      color: #08c79c
    }
  }

  &:active {
    opacity: .2;
    transition-duration: 0s;
  }
}

.label {
  font-weight: 600;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

.transaction-item.refunded .amount {
  position: relative;

  &::before {
    content: '';
    background-color: #08c79c;
    border-radius: 50%;
    position: absolute;
    bottom: -6px;
    right: 50%;
    width: 5px;
    height: 5px;
  }
}
</style>
