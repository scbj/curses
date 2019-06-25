<template>
  <div class="home">
    <img
      class="logo"
      alt="Vue logo"
      src="../assets/images/title.svg"
    >
    <figure
      class="profile"
      @click="logout()"
    >
      <svgicon
        icon="user"
        color="#405348"
        height="36.2"
        width="36.2"
      />
    </figure>

    <RefundBalance />
    <TransactionList />
  </div>
</template>

<script>
import '../assets/compiled-svg/user'

import RefundBalance from '@/components/RefundBalance'
import TransactionList from '@/components/TransactionList'

export default {
  name: 'Home',

  components: {
    RefundBalance,
    TransactionList
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
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
</style>
