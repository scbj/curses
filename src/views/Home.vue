<template>
  <div class="home">
    <img
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
  </div>
</template>

<script>
import '../assets/compiled-svg/user'

import RefundBalance from '@/components/RefundBalance'

export default {
  name: 'Home',

  components: {
    RefundBalance
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 6rem;
  padding: 52px 32px 0 36px;
}

.refund-balance {
  grid-row: 2;
}
</style>
