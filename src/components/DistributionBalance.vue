<script>
import Currency from '@/components/Currency'

export default {
  props: {
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },

  render (h) {
    return (
      <div class="distribution-balance">
        <Currency
          value={this.amount}
          fontSizes={[ '20px', '17px' ]}
          fontWeights={[ 500, 400 ]} />
        <span class="description">{ this.description }</span>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.distribution-balance {
  color: #8090b2;
  display: flex;
  flex-direction: column;
}

.description {
  font-size: 15px;
  font-weight: 500;
}
</style>
