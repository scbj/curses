<script>
import NavigationBarItem from '@/components/NavigationBarItem'

export default {
  data () {
    return {
      items: [
        {
          iconName: 'home',
          route: { name: 'home' },
          label: 'Accueil'
        },
        {
          iconName: 'stats',
          route: { name: 'stats' },
          label: 'Statistique'
        },
        {
          iconName: 'calendar',
          route: { name: 'activity' },
          label: 'Activité'
        },
        {
          iconName: 'user',
          route: { name: 'account' },
          label: 'Compte'
        }
      ]
    }
  },

  render (h) {
    const createItem = item => (
      <NavigationBarItem icon={item.iconName} route={item.route} label={item.label} />
    )
    return (
      <nav class='navigation-bar-list'>
        <ul>
          { this.items.map(createItem) }
        </ul>
      </nav>
    )
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-items: center;
  padding: 10px;

  > li {
    grid-row: 1;

    &:nth-child(3) { grid-column: 4; }
    &:nth-child(4) { grid-column: 5; }
  }
}
</style>
