<template>
  <div class="monthly-history-preview">
    <div
      class="empty-day-start"
      :style="{ '--span-count': spanCount }"
    />
    <div
      v-for="index in dayCount"
      :key="index"
      class="day"
      :class="{ highlight: hasTransaction(index + 1)}"
    />
  </div>
</template>

<script>
export default {
  props: {
    days: {
      type: Array,
      required: true
    }
  },

  computed: {
    now () {
      return new Date()
    },

    dayCount () {
      const lastDay = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0)
      return lastDay.getDate()
    },

    spanCount () {
      const firstDay = new Date(this.now.getFullYear(), this.now.getMonth(), 1)
      const dayNumber = firstDay.getDay()
      return dayNumber === 0 ? 6 : dayNumber - 1
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
  grid: repeat(6, auto) / repeat(7, auto);
  gap: 4px;
}

.empty-day-start {
  grid-column: span var(--span-count);
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
