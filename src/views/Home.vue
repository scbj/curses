<script>
import Currency from '@/components/Currency'
import RefundBalance from '@/components/RefundBalance'
import TransactionList from '@/components/TransactionList'

export default {
  name: 'Home',

  data () {
    return {
      balanceAmount: 12.75
    }
  },

  render (h) {
    return (
      <div class="home">
        <Currency
          value={this.balanceAmount}
          fontSizes={[ '36px', '29px' ]}
          fontWeights={[ 600, 500 ]} />
        <RefundBalance />
        <TransactionList />
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1.5rem;
  padding: 52px 32px 0 36px;
  position: relative;
}

.logo,
.profile {
  grid-row: 1;
  grid-column: 1;
}

.logo {
  transform: translateX(-1em)
}

.profile {
  justify-self: flex-end;
}

.refund-balance {
  grid-row: 2;
}

.balance .sign {
  color: red;
}

.balance {
  .sign {
    color: green;
  }
  .integers {
    color: red;
  }
  .decimals {
    color: blue;
  }
}
</style>
