<template>
  <form
    class="form-transaction"
    @submit="validate"
  >
    <label for="date">
      Date
    </label>
    <div class="date-picker">
      <span>{{ date | calendar | capitalize }}</span>
      <input
        v-model="date"
        type="date"
        name="date"
      >
    </div>

    <label for="amount">Montant</label>
    <span class="amount">
      <EditableCurrencyAmount @change="amountChange" /> €
    </span>

    <label for="description">Description (60 caractères max.)</label>
    <input
      v-model="description"
      class="description"
      type="text"
      name="description"
    >
    <button
      class="validate-button"
      type="submit"
    >
      Ajouter la dépense
    </button>
  </form>
</template>

<script>
import EditableCurrencyAmount from '@/components/EditableCurrencyAmount.vue'

import { calendar } from '@/filters/date'
import { capitalize } from '@/filters/string'
import api from '@/services/api'
import { EventBus } from '@/reactivity/event-bus'

export default {
  filters: { calendar, capitalize },

  components: {
    EditableCurrencyAmount
  },

  data () {
    return {
      date: new Date(),
      amount: 0,
      description: ''
    }
  },

  methods: {
    amountChange (value) {
      this.amount = value
    },

    async validate (event) {
      // Prevent default behavior with form submit (POST navigation)
      event.preventDefault()

      // Create the transaction with the specified data
      const transaction = await api('transaction.create', {
        date: this.date,
        amount: this.amount,
        description: this.description
      })

      // If it's a succes then reset some fields and emit events
      if (transaction && transaction._id) {
        this.resetAmountDescription()
        EventBus.$emit('transaction.created', transaction)
        this.$emit('completed')
      }
    },

    resetAmountDescription () {
      this.amount = 0
      this.description = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-transaction {
  display: flex;
  flex-direction: column;
}

label {
  font-family: 'TT Commons';
  font-weight: 700;
  font-size: 18px;
  color: #323232;
  margin-bottom: 6px;
  margin-top: 22px;

  &:first-of-type {
    margin-top: 0;
  }
}

.date-picker {
  position: relative;
  align-self: flex-start;

  span {
    font-family: 'TT Commons';
    font-weight: 500;
    font-size: 18px;
    color: #23a665;
  }
  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.amount {
  font-family: 'TT Commons';
  font-weight: 300;
  font-size: 52px;
  color: #23a665;

  > em {
    user-select: none;
    font-weight: 600;
    color: transparent;
    text-shadow: 0 0 0 #23a665;

    &:focus {
      outline: none;
    }
  }
}

input.description {
  font-family: 'TT Commons';
  font-weight: 500;
  font-size: 18px;
  color: #0c3b24;
  background: white;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 11px 12px;
  padding-top: 14px;
  margin-top: 4px;
  box-shadow: 0 4px 10px -2px rgba(#779189, 0.15);

  &:focus {
    outline: none;
    border-color: #23a665;
    box-shadow: 0 4px 10px -2px rgba(#23a665, 0.15);
  }

  &:-webkit-autofill {
    box-shadow:
      0 4px 10px -2px rgba(#779189, 0.15),
      0 0 0px 1000px white inset;

    &:focus {
      box-shadow:
        0 4px 10px -2px rgba(#23a665, 0.15),
        0 0 0px 1000px white inset;
    }
  }
}

.validate-button {
  font-family: 'TT Commons';
  font-weight: 700;
  font-size: 18px;
  color: white;
  background: #1ABC8C;
  border: none;
  border-radius: 6px;
  padding: 14px;
  margin-top: 36px;
  box-shadow: 0 4px 10px -2px rgba(#14916C, 0.38);

  &:focus {
    outline: none;
  }
}
</style>
