<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <slot name="item-template" :item="item" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
