<script>
export default {
  mounted () {
    this.$store.dispatch('auth/logout')
  },

  render (h) {
    return <div>Account</div>
  }
}
</script>
