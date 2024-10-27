<script>
import UrlShortener from "./views/UrlShortener.vue";

export default {
  components: {
    UrlShortener,
  },
};
</script>

<template>
  <div class="container">
    <UrlShortener />
  </div>
</template>

<style lang="scss">
#app {
  --angle: 0deg;
  position: relative;
  width: clamp(350px, 42vw, 750px);
  margin-block: 3rem;
  z-index: 1;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 1px;
    width: 100%;
    height: 100%;
    background-image: conic-gradient(from var(--angle), #9e9eff, transparent);
    z-index: -1;
    border-radius: 20px;
    animation: spin 5s linear infinite;
  }

  &::after {
    filter: blur(1.5rem);
    opacity: 0.5;
  }

  .container {
    background: #fff;
    padding: 3rem;
    border-radius: 20px;
    width: 100%;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }
}

@keyframes spin {
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
}
</style>
