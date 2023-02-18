<template>
  <div class="loading-overlay">
    <dialog open @click.stop>
      <header>
        <slot name="header"> </slot>
      </header>
      <section>
        <slot name="content"></slot>
      </section>
    </dialog>
  </div>
</template>

<script>
export default {
  name: "BaseModal",

  setup(props, context) {
    function hideDialog() {
      context.emit("hide-dialog");
    }

    return { hideDialog };
  },
};
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

header {
  background-color: #4abdac !important;
  color: white;
  width: 100%;
  padding: 1rem;
}

header {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>