<template>
  <div class="editable-currency-amount">
    <input
      ref="input"
      :value="value"
      autofocus
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
import { currency } from '@/filters/number'

/**
 * Format the specfied input to a number with two decimals.
 * @param {String} input
 * @param {Number} [max]
 * @returns {Number}
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

export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },

  computed: {
    input () {
      return currency(this.value)
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
      this.updateInput(this.input + char)
      this.moveCursorToEnd()
    },

    onInput (event) {
      this.updateInput(event.target.value)
    },

    updateInput (input) {
      const value = formatAsHundredthAccuracyNumber(input)
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.editable-currency-amount {
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
