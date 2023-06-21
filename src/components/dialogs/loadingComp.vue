<template>
  <div class="loading">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="loading_text">Vui lòng đợi...</div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  display: grid;
  justify-content: center;
  .loading_text {
    letter-spacing: 0.0015em;
    font-size: 1.6rem;
    text-shadow: 0 1px #8da1ff, -1px 0 #c0cbff, -1px 2px #8da1ff, -2px 1px #c0cbff, -2px 3px #8da1ff,
      -3px 2px #c0cbff, -3px 4px #8da1ff, -4px 3px #c0cbff, -4px 5px #8da1ff, -5px 4px #c0cbff,
      -5px 6px #8da1ff, -6px 5px #c0cbff, -6px 7px #8da1ff, -7px 6px #c0cbff, -7px 8px #8da1ff,
      -8px 7px #c0cbff;
  }
}
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #a3a3a3;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
