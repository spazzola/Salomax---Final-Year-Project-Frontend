<template>
  <div class="loading-overlay" v-if="loading">
    <div class="loading-spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'BaseGrowSpinner',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
  },
  setup() {
    
  },
}
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-spinner {
  border-top: 16px solid #fc4a1a;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>