<template>
  <div class="monthly-history-preview">
    <div class="empty-day-start" />
    <div
      v-for="index in count"
      :key="index"
      class="day"
      :class="{ highlight: hasTransaction(index + 1)}"
    />
    <div class="empty-day-end" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 24,
      days: [ 3, 9, 13, 19, 20 ]
    }
  },

  methods: {
    hasTransaction (dayNumber) {
      return this.days.includes(dayNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
.monthly-history-preview {
  display: grid;
  grid: repeat(5, auto) / repeat(7, auto);
  gap: 4px;
}

.empty-day-start {
  grid-column: span 6;
}

.day {
  background: white;
  border-radius: 2px;
  opacity: .27;

  $size: 12px;
  width: $size;
  height: $size;

  &.highlight {
    opacity: .67;
  }
}
</style>
