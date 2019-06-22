<template>
  <div class="home">
    <img
      class="logo"
      alt="Vue logo"
      src="../assets/images/title.svg"
    >
    <svgicon
      icon="user"
      color="#405348"
      height="36.2"
      width="36.2"
    />
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
.svg-icon {
  grid-row: 1;
  grid-column: 1;
}

.logo {
  transform: translateX(-1em)
}

.svg-icon {
  justify-self: flex-end;
}

.refund-balance {
  grid-row: 2;
}
</style>
