<script>
import RefundBalance from '@/components/RefundBalance'
import TransactionList from '@/components/TransactionList'

export default {
  name: 'Home',

  components: {
    RefundBalance,
    TransactionList
  },

  render (h) {
    return (
      <div class="home">
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
</style>
