<script>
export default {
  props: {
    route: {
      type: Object,
      default: null
    }
  },

  render (h) {
    if (this.route) {
      return (
        <RouterLink class="text-button" to={ this.route } >
          { this.$slots.default }
        </RouterLink>
      )
    }
    return (
      <button class="text-button" onClick={this.$emit('click', event)}>
        { this.$slots.default }
      </button>
    )
  }
}
</script>
