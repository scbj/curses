<template>
  <form
    class="form-transaction"
    @submit="next"
  >
    <label for="date">
      Date
    </label>
    <div class="date-picker">
      <span>{{ transaction.date | calendar | capitalize }}</span>
      <input
        v-model="transaction.date"
        type="date"
        name="date"
      >
    </div>

    <label for="amount">Montant</label>
    <span
      ref="amount"
      class="amount"
    >
      <EditableCurrencyAmount
        v-model="transaction.amount"
        focus
      /> €
    </span>

    <label for="description">Description (60 caractères max.)</label>
    <input
      ref="description"
      v-model="transaction.description"
      class="description"
      type="text"
      name="description"
    >
    <button
      class="next-button"
      type="submit"
    >
      {{ validateButtonText }}
    </button>
  </form>
</template>

<script>
import { get } from 'vuex-pathify'

import EditableCurrencyAmount from '@/components/EditableCurrencyAmount.vue'

import { calendar } from '@/filters/date'
import { capitalize } from '@/filters/string'

export default {
  filters: { calendar, capitalize },

  components: {
    EditableCurrencyAmount
  },

  data () {
    return {
      transaction: {
        date: new Date(),
        amount: 0,
        description: ''
      }
    }
  },

  computed: {
    mode: get('transaction/modal@mode'),
    currentTransaction: get('transaction/modal@currentTransaction'),

    validateButtonText () {
      switch (this.mode) {
        case 'edit': return 'Modifier la dépense'
        default: return 'Ajouter la dépense'
      }
    }
  },

  mounted () {
    if (this.mode === 'edit' && this.currentTransaction) {
      Object.assign(this.transaction, this.currentTransaction)
    }
  },

  methods: {
    async next (event) {
      // Prevent default behavior with form submit (POST navigation)
      event.preventDefault()

      /** @returns {Element} */
      const validate = () => {
        if (this.transaction.amount === 0) return this.$refs.amount
        else if (!this.transaction.description.trim()) return this.$refs.description
      }

      const errorElement = validate()
      if (errorElement) {
        return this.shake(errorElement)
      }

      const updateTransaction = () => {
        // Update the specified transaction
        console.log('TCL: updateTransaction -> this.transaction', JSON.stringify(this.transaction))
        return this.$store.dispatch('transaction/update', Object.assign({}, this.transaction))
      }

      const createTransaction = () => {
        // Create the transaction with the specified data
        console.log('TCL: createTransaction -> this.transaction', this.transaction)
        return this.$store.dispatch('transaction/create', this.transaction)
      }

      const success = this.mode === 'edit'
        ? updateTransaction()
        : createTransaction()
      console.log('TCL: next -> success', success)
      console.log('TCL: next -> await success', await success)

      // If it's a succes then reset some fields
      if (await success) {
        this.resetAmountDescription()
        this.$emit('completed')
      }
    },

    resetAmountDescription () {
      this.transaction.amount = 0
      this.transaction.description = ''
    },

    shake (element) {
      element.animate([
        { borderColor: '#fb4b4b' },
        { borderColor: '#fb4b4b' },
        { borderColor: 'transparent' }
      ], {
        duration: 600,
        easing: 'ease-out'
      })
      element.animate([
        { transform: 'translate(0.4em)' },
        { transform: 'translate(-0.4em)' },
        { transform: 'translate(0.2em)' },
        { transform: 'translate(-0.2em)' },
        { transform: 'translate(0.03em)' },
        { transform: 'translate(0)' }
      ], {
        duration: 400,
        easing: 'linear'
      })
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
  font-weight: 700;
  font-size: 18px;
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
    font-weight: 700;
    font-size: 18px;
    color: var(--highlight-color);
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
  font-weight: 300;
  font-size: 52px;
  color: var(--highlight-color);
}

input.description {
  font-weight: 500;
  font-size: 18px;
  color: var(--text-color);
  background: #f6f6fe;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 11px 12px;
  padding-top: 14px;
  margin-top: 4px;
  box-shadow: 0 4px 10px -2px rgba(#777E91, 0.15);

  &:focus {
    outline: none;
    border-color: var(--highlight-color);
    box-shadow: 0 4px 10px -2px rgba(var(--highlight-color), 0.15);
  }

  &:-webkit-autofill {
    box-shadow:
      0 4px 10px -2px rgba(#777E91, 0.15),
      0 0 0px 1000px white inset;

    &:focus {
      box-shadow:
        0 4px 10px -2px rgba(var(--highlight-color), 0.15),
        0 0 0px 1000px white inset;
    }
  }
}

.next-button {
  font-weight: 700;
  font-size: 18px;
  color: white;
  background: var(--highlight-color);
  border: none;
  border-radius: 6px;
  padding: 14px;
  margin-top: 36px;
  box-shadow: 0 4px 10px -2px rgba(#222F90, 0.38);

  &:focus {
    outline: none;
  }
}
</style>
