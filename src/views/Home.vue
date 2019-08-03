<script>
import Balance from '@/components/Balance'
import Distribution from '@/components/Distribution'
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
</style>
