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
  </div>
</template>

<script>
import '../assets/compiled-svg/user'

export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 52px 32px 0 36px;
}
</style>
