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
    },
    label: {
      type: String,
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
        <span class="label">{ this.label }</span>
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

  &.active {
    svg {
      transform: translate3d(0, -10px, 0);
    }
    .label {
      transform: translate3d(0, 14px, 0);
      opacity: 1;
    }
  }
}

svg,
.label {
  transition:
    opacity .2s cubic-bezier(.22,1.01,.12,.99),
    transform .35s cubic-bezier(.22,1.01,.12,.99);
}

.label {
  color: var(--highlight-color);
  font-weight: 600;
  position: absolute;
  transform: translate3d(0, 20px, 0);
  opacity: 0;
}
</style>
