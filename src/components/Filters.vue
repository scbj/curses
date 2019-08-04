<script>
import { get, sync } from 'vuex-pathify'

export default {
  computed: {
    filters () {
      return [
        {
          name: 'all',
          label: 'Tous'
        },
        {
          name: 'unrefunded',
          label: `En attente (${this.unrefundedCount})`
        }
      ]
    },

    unrefundedCount: get('transaction/unrefundedCount'),
    activeFilter: sync('transaction/activeFilter')
  },

  methods: {
    setActive (filter) {
      this.activeFilter = filter.name
    },

    isActive (filter) {
      return this.activeFilter === filter.name
    }
  },

  render (h) {
    const createFilter = filter => (
      <li
        class={{ filter: true, active: this.isActive(filter) }}
        onClick={() => this.setActive(filter)}>
        { filter.label }
      </li>
    )
    return (
      <ul class="filters">
        { this.filters.map(createFilter) }
      </ul>
    )
  }
}
</script>

<style lang="scss" scoped>
$easing: cubic-bezier(.165, .84, .44, 1);

.filters {
  display: flex;
  flex-direction: row;
}

.filter {
  background: #f6f6fe;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px 8px 20px;
  margin-left: 13px;
  transition: all .2s $easing;

  &:first-of-type {
    margin-left: 0;
  }

  &.active {
    background: #eaf0fe;
  }

  &:active {
    opacity: .4;
  }
}
</style>
