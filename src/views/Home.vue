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
    <div class="action-bar">
      <button
        class="add-button"
        @click="openModal()"
      >
        <svgicon
          icon="add"
          color="#fff"
          height="22"
          width="22"
        />
      </button>
    </div>
    <router-view />
    />
  </div>
</template>

<script>
import '../assets/compiled-svg/user'
import '../assets/compiled-svg/add'

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
    },

    openModal () {
      this.$router.push('new')
    }
  }
}
</script>

<style lang="scss" scoped>
$easing: cubic-bezier(.165, .84, .44, 1);

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

.action-bar {
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.add-button {
  background: #1abc8c;
  border: none;
  border-radius: 50%;
  padding: 16px;
  margin-bottom: 34px;
  z-index: 10;
  box-shadow: 0 5px 18px -2px rgba(#14916c, .68);
  transition: transform 80ms $easing;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.95);
    transition-duration: 120ms;
  }
}
</style>
