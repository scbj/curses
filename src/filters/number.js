/**
 * Convert specified value to a right currency representation. Default value is fr-FR in EUR.
 * @param {Number} input
 * @param {Object} options
 * @param {String} options.locale
 * @param {String} options.currency
 * @returns {String}
 */
export function currency (value, { locale = 'fr-FR', currency = 'EUR', symbol = false } = {}) {
  const options = {
    currency,
    style: 'currency'
  }
  const str = new Intl
    .NumberFormat(locale, options)
    .format(value)
  return (symbol && str) || str.slice(0, -2)
}
