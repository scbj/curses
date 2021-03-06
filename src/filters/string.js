/**
 * Capitalize the first letter of a string.
 * @param {String} value
 * @returns {String}
 */
export function capitalize (value) {
  if (value.length > 0) {
    return `${value[0].toUpperCase()}${value.substr(1)}`
  }
  return value
}
