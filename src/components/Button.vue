<script>
export default {
  render () {
    return (
      <button attrs={this.$attrs} on={this.$listeners}>
        { this.$slots.default }
      </button>
    )
  }
}
</script>

<style lang="scss" scoped>
button {
  font-weight: 700;
  font-size: 18px;
  color: white;
  background: var(--highlight-color);
  border: none;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 4px 10px -2px rgba(#222F90, 0.38);

  &:focus {
    outline: none;
  }
}
</style>
