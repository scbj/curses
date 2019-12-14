<template>
  <div class="account">
    <p :class="{ show: lastAttempt }">
      🔓<br><br>You can now safely disconnect from your account.
    </p>
    <Button
      id="button"
      class="button"
      :class="{real: attemptCount === maxAttempt}"
      @click="logout()"
    >
      {{ buttonLabel }}
    </Button>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  components: {
    Button
  },

  data () {
    return {
      attemptCount: 0
    }
  },

  computed: {
    buttonLabels () {
      return [
        "Don't touch",
        `I said "don't"!`,
        'No',
        'STOP!!',
        'Fuck it.',
        'Logout Safely'
      ]
    },

    maxAttempt () {
      return this.buttonLabels.length - 1
    },

    lastAttempt () {
      return this.attemptCount >= this.maxAttempt
    },

    buttonLabel () {
      const index = Math.min(Math.abs(this.attemptCount), this.maxAttempt)
      return this.buttonLabels[index]
    }
  },

  methods: {
    logout () {
      this.attemptCount += 1
      if (this.attemptCount > this.maxAttempt) {
        this.$store.dispatch('auth/logout')
        this.$router.push({ name: 'login' })
      } else {
        const element = document.getElementById('button')
        element.animate([
          { transform: 'translate(0.4em)' },
          { transform: 'translate(-0.4em)' },
          { transform: 'translate(0.2em)' },
          { transform: 'translate(-0.2em)' },
          { transform: 'translate(0.03em)' },
          { transform: 'translate(0)' }
        ], {
          duration: 400,
          easing: 'linear'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.account {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .button {
    background: #fb4b4b;
    transition: background .1s ease-out;

    &.real {
      background: #fbbd4b;
    }
  }
}

p {
  opacity: 0;
  margin: 1em;
  margin-bottom: 2em;
  max-width: 14em;
  text-align: center;

  &.show {
    transform: translate3d(0, 30px, 0);
    animation: fade-up .6s cubic-bezier(.22,1.01,.12,.99) forwards;

    @keyframes fade-up {
      100% {
        opacity: 1;
        transform: translate3d(0,0,0);
      }
    }
  }
}

</style>
