<script>
export default {
  props: {
    percents: {
      type: Array,
      required: true
    }
  },

  computed: {
    gridTemplateColumns () {
      return {
        gridTemplateColumns: this.percents.join(' ')
      }
    }
  },

  render (h) {
    return (
      <figure class="distribution-chart" style={this.gridTemplateColumns}>
        <div class="bar" />
        <div class="bar" />
        <div class="bar" />
      </figure>
    )
  }
}
</script>

<style lang="scss" scoped>
.distribution-chart {
  --height: 15px;

  display: grid;
  grid-template-rows: var(--height);
}

.bar {
  border-radius: calc(var(--height) / 2);
  grid-row: 1;

  &:nth-child(1) {
    background: #4b60fb;
    grid-column: 1 / -1;
  }
  &:nth-child(2) {
    background: #fbc64b;
    grid-column: 1 / 3;
  }
  &:nth-child(3) {
    background: #08c79c;
    grid-column: 1 / 2;
  }
}
</style>
