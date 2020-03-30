<script>
export default {
  props: {
    route: {
      type: Object,
      default: null
    }
  },

  methods: {
    dispatchClickEvent (event) {
      this.$emit('click', event)
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
      <button class="text-button" onClick={this.dispatchClickEvent}>
        { this.$slots.default }
      </button>
    )
  }
}
</script>
