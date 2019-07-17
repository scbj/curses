<template>
  <form class="form-transaction">
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
  </form>
</template>

<script>
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
      date: new Date(),
      amount: 0
    }
  },

  methods: {
    amountChange (value) {
      this.amount = value
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
</style>
