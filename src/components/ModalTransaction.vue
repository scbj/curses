<template>
  <div
    class="modal-transaction"
    @click="close($event)"
  >
    <div
      class="card"
      @click.stop
    >
      <span class="title">Transaction</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close (event) {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-transaction {
  background: rgba(black, 0.26);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;

  position: fixed;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}

.card {
  background: #f5f5f5;
  border-radius: 12px 12px 0 0;

  padding: 30px 34px;
  display: flex;
  flex-direction: column;

  box-shadow: 0 -4px 16px rgba(#5e736c, 0.3);
}

.title {
  font-family: 'TT Commons';
  font-weight: 800;
  font-size: 38px;
  color: #114f30;
  align-self: center;
}
</style>
