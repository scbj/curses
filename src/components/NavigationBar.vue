<template>
  <div class="navigation-bar">
    <div class="volatile-wrapper">
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
    <NavigationBarList />
  </div>
</template>

<script>
import NavigationBarList from '@/components/NavigationBarList'

export default {
  components: {
    NavigationBarList
  },

  methods: {
    openModal () {
      this.$router.push({ name: 'home.create' })
    }
  }
}
</script>

<style lang="scss" scoped>
$easing: cubic-bezier(.165, .84, .44, 1);

.navigation-bar {
  background: #f7f7f7;
  position: relative;
  z-index: 10;
}

.volatile-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-40%);

  .add-button {
    background: var(--highlight-color);
    border: none;
    border-radius: 50%;
    padding: 19px;
    // box-shadow: 0 5px 18px -2px rgba(#14916c, .68);
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
}

</style>
