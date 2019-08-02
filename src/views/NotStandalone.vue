<template>
  <div class="not-standalone">
    <svgicon
      icon="arrow"
      height="60"
      width="60"
    />
    <span class="message">
      <em>Installer l'application</em> en l'ajoutant à l'écran d'accueil.
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.not-standalone {
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 2rem;
  height: 100vh;
}

.svg-icon {
  fill: var(--highlight-color);
  stroke: none;
  justify-self: flex-end;
  align-self: flex-start;
}

.message {
  font-family: 'TT Commons';
  font-weight: 500;
  font-size: 20px;
  line-height: 1.4em;
  justify-self: center;
  align-self: center;

  em {
    font-weight: 700;
    color: var(--highlight-color);
  }
}
</style>
