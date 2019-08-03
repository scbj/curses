<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  render (h) {
    return (
      <div class="main">
        <KeepAlive>
          <RouterView name="page" />
        </KeepAlive>
        <NavigationBar />
        <RouterView name="modal" />
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.navigation-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
