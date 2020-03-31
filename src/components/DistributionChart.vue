<template>
  <figure
    class="distribution-chart"
    :class="{ disabled }"
    :style="gridTemplateColumns"
  >
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
  </figure>
</template>

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
    },

    disabled () {
      return this.percents.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.distribution-chart {
  --height: 15px;

  display: grid;
  grid-template-rows: var(--height);

  &.disabled {
    filter: grayscale(1);

    .bar {
      opacity: 0;

      &:nth-child(2) {
        opacity: .27;
      }
    }
  }
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
