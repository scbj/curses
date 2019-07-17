<template>
  <div class="editable-currenct-amount">
    <input
      ref="input"
      v-model="input"
      spellcheck="false"
      type="tel"
      @keydown="moveCursorToEnd()"
      @keypress="onKeyPress"
      @input="onInput"
    >
    <span>{{ input }}</span>
  </div>
</template>

<script>
/**
 * Format the specfied input to a number with two decimals.
 * @param {String} input
 * @param {Number} [max]
 * @returns {String}
 */
function formatAsHundredthAccuracyNumber (input, max = 999999) {
  // Remove all characters. Keep only digits.
  const value = Number(
    input
      .replace(/\.|,/g, '')
      .replace(/\D/g, '')
      .substring(0, 6)
  )

  // Return the value or the maxium value, divide by 100 to add decimals.
  return Math.min(value, max) / 100
}
/**
 * Convert specified value to a right currency value with two decimals. Default value is fr-FR in EUR.
 * @param {String} input
 * @param {Object} options
 * @param {String} options.locale
 * @param {String} options.currency
 * @returns {String}
 */
function emendAsCurrency (input, { locale = 'fr-FR', currency = 'EUR' } = {}) {
  const value = formatAsHundredthAccuracyNumber(input)
  const options = {
    currency,
    style: 'currency'
  }
  return new Intl
    .NumberFormat(locale, options)
    .format(value)
    .slice(0, -2)
}

export default {
  data () {
    return {
      input: emendAsCurrency('0')
    }
  },

  methods: {
    moveCursorToEnd () {
      this.$refs.input.setSelectionRange(this.input.length, this.input.length)
    },

    onKeyPress (event) {
      // Change manually the input data
      event.preventDefault()
      const char = String.fromCharCode(event.keyCode || event.charCode)
      this.input = emendAsCurrency(this.input + char)
      this.moveCursorToEnd()
    },

    onInput (event) {
      this.input = emendAsCurrency(event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.editable-currenct-amount {
  display: inline-block;
  position: relative;

  span,
  input {
    font-family: 'TT Commons';
    font-weight: 600;
    font-size: 52px;
    color: #23a665;
  }

  input {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
  }

  span {
    position: relative;
    pointer-events: none;
    user-select: none;
  }
}
</style>
