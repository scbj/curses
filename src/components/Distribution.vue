<script>
import DistributionChart from '@/components/DistributionChart'

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
  grid-gap: 8px;
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
}
</style>
