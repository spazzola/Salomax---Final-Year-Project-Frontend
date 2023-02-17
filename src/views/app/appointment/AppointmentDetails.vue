<template>
  <div class="loading-overlay" v-if="showDialog" @click="hideDialog">
    <div class="my-modal" @click.stop></div>
  </div>
</template>

<script>
export default {
  name: "AppointmentDetails",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    function hideDialog() {
      context.emit('hide-dialog');
    }

    return { hideDialog }
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

.my-modal {
  width: 30rem;
  height: 20rem;
  z-index: 100;
  background-color: red;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>