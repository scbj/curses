<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    route: {
      type: Object,
      required: true
    }
  },

  render (h) {
    return (
      <router-link to={this.route} class='navigation-bar-item' tag='li'>
        <svgicon
          icon={this.icon}
          height='20'
          width='20'
        />
      </router-link>
    )
  }
}
</script>

<style lang="scss" scoped>
.navigation-bar-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 35px;

  &.active svg {
    stroke: var(--highlight-color)
  }

  svg {
    stroke: #8090b2;
  }
}
</style>
