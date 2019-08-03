<script>
import DistributionBalance from '@/components/DistributionBalance'
import DistributionChart from '@/components/DistributionChart'
import TextButton from '@/components/TextButton'

export default {
  data () {
    return {
      // Fake data for development purpose
      balances: [
        {
          user: 'Moi',
          amount: 27
        },
        {
          user: 'Rick',
          amount: 64.9
        },
        {
          user: 'John',
          amount: 16.29
        }
      ]
    }
  },

  computed: {
    /**
     * Returns the balances total.
     * @returns {Number}
     */
    total () {
      return this.balances
        .reduce((total, { amount }, index) => total + amount, 0)
    },

    /**
     * Returns an array of string represents the percentages
     * of each balance in the relation to the total.
     */
    percents () {
      const asPercent = ({ amount }) => `${100 * amount / this.total}%`
      return this.balances.map(asPercent)
    }
  },

  render (h) {
    return (
      <div class="distribution">
        <span class="title">Répartition des dépenses</span>
        <DistributionChart class="chart" percents={this.percents} />
        <DistributionBalance
          class="own"
          amount={27}
          description="POUR MOI" />
        <DistributionBalance
          class="total"
          amount={27}
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
