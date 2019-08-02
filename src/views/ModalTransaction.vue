<template>
  <div
    class="modal-transaction"
    @click="close()"
  >
    <div
      class="card"
      @click.stop
    >
      <span class="title">Transaction</span>
      <FormTransaction @completed="close()" />
    </div>
  </div>
</template>

<script>
import FormTransaction from '@/components/FormTransaction.vue'

export default {
  components: {
    FormTransaction
  },

  methods: {
    close () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-transaction {
  background: rgba(black, 0.5);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;

  position: fixed;
  z-index: 100;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.card {
  background: var(--background-color);
  border-radius: 12px 12px 0 0;

  padding: 30px 34px;
  display: flex;
  flex-direction: column;

  box-shadow: 0 -4px 16px rgba(#5e736c, 1.0);
}

.title {
  font-family: 'TT Commons';
  font-weight: 800;
  font-size: 38px;
  color: #0c3b24;
  align-self: center;
  margin-bottom: 32px;
}
</style>
