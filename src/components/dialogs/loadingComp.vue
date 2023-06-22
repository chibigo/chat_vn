<template>
  <div class="loading">
    <div class="lds-hourglass"></div>
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
  justify-items: center;
  .loading_text {
    letter-spacing: 0.0015em;
    font-size: 1.6rem;
    text-shadow: 0 1px #8da1ff, -1px 0 #c0cbff, -1px 2px #8da1ff, -2px 1px #c0cbff, -2px 3px #8da1ff,
      -3px 2px #c0cbff, -3px 4px #8da1ff, -4px 3px #c0cbff, -4px 5px #8da1ff, -5px 4px #c0cbff,
      -5px 6px #8da1ff, -6px 5px #c0cbff, -6px 7px #8da1ff, -7px 6px #c0cbff, -7px 8px #8da1ff,
      -8px 7px #c0cbff;
  }
}
.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: ' ';
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #0051ff;
  border-color: #1976d2 transparent #1976d2 transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
