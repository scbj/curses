<script>
import { get } from 'vuex-pathify'

import DistributionBalance from '@/components/DistributionBalance'
import DistributionChart from '@/components/DistributionChart'
import TextButton from '@/components/TextButton'

export default {
  computed: {
    selfAmount: get('balance/selfAmount'),
    total: get('balance/totalAmount'),
    balances: get('balance/items'),
    username: get('auth/username'),

    /**
     * Returns an array of string represents the percentages
     * of each balance in the relation to the total.
     */
    percents () {
      /**
       * Returns true if the balance of the authenticated user is present in the balance list.
       * @returns {Boolean}
       */
      const hasOwnBalance = () => this.balances.some(balance => balance.owner === this.username)

      const balances = hasOwnBalance()
        ? this.balances.slice().sort((a, b) => {
          return a.owner === this.username ? -1 : b.owner === this.username ? 1 : 0
        })
        : [ { amount: 0 }, ...this.balances ]
      const asPercent = ({ amount }) => `${100 * amount / this.total}%`
      return balances.map(asPercent)
    }
  },

  mounted () {
    this.$store.dispatch('balance/list')
  },

  render (h) {
    return (
      <div class="distribution">
        <span class="title">Répartition des dépenses</span>
        <DistributionChart class="chart" percents={this.percents} />
        <DistributionBalance
          class="own"
          amount={this.selfAmount}
          description="POUR MOI" />
        <DistributionBalance
          class="total"
          amount={this.total}
          description="TOTAL A REMBOURSER" />
        <TextButton class="button-see-more" route={{ name: 'stats' }}>Voir le détail</TextButton>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.distribution {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  border-radius: 8px;
  background: var(--background-color);
  box-shadow: 0 1px 4px -1px rgba(#000000, 16%);
  padding: 13px 15px;
  margin: 9px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  grid-row: 1;
  grid-column: 1 / -1;
}

.chart {
  grid-row: 2;
  grid-column: 1 / -1;
  margin: 6px 0 12px 0;
}

.distribution-balance {
  &.own {
    color: #08c79c;
  }

  &.total {
    color: #8090b2;
    align-items: flex-end;
  }
}

.button-see-more {
  justify-self: flex-start;
  margin-top: 18px;
}
</style>
