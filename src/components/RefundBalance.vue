<template>
  <section class="refund-balance">
    <h3 class="label">
      Solde de remboursement :
    </h3>
    <span
      class="amount"
      :class="{ negative: isNegative }"
    >
      <em>{{ signedAmount }}</em> €
    </span>
  </section>
</template>

<script>
export default {
  data () {
    return {
      amount: 23.61
    }
  },

  computed: {
    isNegative () {
      return this.amount < 0
    },

    signedAmount () {
      const sign = this.isNegative ? '-' : '+'
      return `${sign} ${Math.abs(this.amount)}`
    }
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
