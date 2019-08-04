<script>
import Balance from '@/components/Balance'
import Distribution from '@/components/Distribution'
import Filters from '@/components/Filters'
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
        <Balance amount={this.balanceAmount} />
        <Distribution />
        <Filters />
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
  position: relative;
}

.balance {
  margin-top: 52px;
}

.filters {
  margin: 0 17px;
}
</style>
