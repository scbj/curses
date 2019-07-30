<template>
  <div class="login">
    <img
      alt="Vue logo"
      src="../assets/images/logo.svg"
    >
    <button @click="login">
      Se connecter
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$store.dispatch('auth/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: grid;
  grid-template-rows: 1fr auto;
  // justify-content: center;
  padding: 50px 34px;
  width: 100%;
  height: 100vh;
}

img {
  justify-self: center;
  align-self: center;
  margin-top: -6rem;
}

button {
  font-family: 'TT Commons';
  font-weight: 700;
  font-size: 18px;
  color: white;
  background: #1abc8c;
  border: none;
  border-radius: 6px;
  outline: none;
  font-size: inherit;
  cursor: pointer;
  box-shadow: 0px 4px 8px -3px rgba(#14916c, 38%);
  padding: 15px;
  justify-self: stretch;
}
</style>
