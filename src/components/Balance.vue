<script>
import Currency from '@/components/Currency'

export default {
  props: {
    amount: {
      type: Number,
      required: true
    }
  },

  render (h) {
    return (
      <div class="balance">
        <Currency
          value={this.amount}
          fontSizes={[ '36px', '29px' ]}
          fontWeights={[ 600, 500 ]} />
        <span class="description">En attente de remboursement</span>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.balance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.description {
  font-size: 18px;
  font-weight: 400;
}
</style>
