<template>
  <div class="home">
    <RefundBalance />
    <TransactionList />
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import RefundBalance from '@/components/RefundBalance'
import TransactionList from '@/components/TransactionList'

export default {
  name: 'Home',

  components: {
    NavigationBar,
    RefundBalance,
    TransactionList
  },

  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1.5rem;
  padding: 52px 32px 0 36px;
  position: relative;
}

.logo,
.profile {
  grid-row: 1;
  grid-column: 1;
}

.logo {
  transform: translateX(-1em)
}

.profile {
  justify-self: flex-end;
}

.refund-balance {
  grid-row: 2;
}

.navigation-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
