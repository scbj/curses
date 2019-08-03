<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    fontSizes: {
      type: Array,
      required: true
    },
    fontWeights: {
      type: Array,
      required: true
    },
    sign: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Returns only the integers of the value.
     * @returns {Number}
     */
    integers () {
      return Math.floor(this.value)
    },

    /**
     * Returns only the decimals of the value.
     * @returns {Number}
     */
    decimals () {
      return (this.value - this.integers) * 100
    },

    cssVariables () {
      const generateVariables = (prop, values) => values.reduce((prev, value, index) => ({
        ...prev,
        [`--${prop}-${index + 1}`]: value
      }), {})

      return {
        ...generateVariables('font-size', this.fontSizes),
        ...generateVariables('font-weight', this.fontWeights)
      }
    }
  },

  render () {
    return (
      <span class="currency" style={this.cssVariables}>
        { this.sign && <span class="sign">+&nbsp;</span> }
        <span class="integers">{ this.integers }</span>
        <span class="decimals">,{ this.decimals }</span>
        <span class="symbol">&nbsp;€</span>
      </span>
    )
  }
}
</script>

<style lang="scss" scoped>
.currency {
  font-family: 'TT Commons';
}

.sign,
.integers,
.symbol {
  font-size: var(--font-size-1);
  font-weight: var(--font-weight-1);
}

.decimals {
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-2);
}
</style>
