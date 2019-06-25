const _pipe = (a, b) => (arg) => b(a(arg))

// Refactored
export default function pipe (...ops) {
  return ops.reduce(_pipe)
}
