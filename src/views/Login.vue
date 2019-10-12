<script>
import Button from '@/components/Button'

export default {
  methods: {
    login () {
      this.$store.dispatch('auth/login')
    }
  },

  render (h) {
    const logoSrc = require('@/assets/images/logo.svg')
    return (
      <div class="login">
        <img
          alt="Vue logo"
          src={logoSrc}
        />
        <Button onClick={this.login}>
          Se connecter
        </Button>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: grid;
  grid-template-rows: 1fr auto;
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
  font-weight: 700;
  font-size: 18px;
  color: white;
  background: var(--highlight-color);
  border: none;
  border-radius: 6px;
  outline: none;
  font-size: inherit;
  cursor: pointer;
  box-shadow: 0px 4px 8px -3px var(--highlight-color);
  padding: 15px;
  justify-self: stretch;
}
</style>
