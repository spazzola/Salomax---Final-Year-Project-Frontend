<template>
  <button
    type="submit"
    @click.prevent="handleSubmit"
    class="btn btn-primary"
    :disabled="isDisabled"
  >
   {{btntext}}
  </button>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  name: 'BaseButton',
  setup(props, context) {
    const btntext = ref(props.text);

    function handleSubmit() {
      context.emit('clicked');
    }

    return { btntext, handleSubmit }
  },
};
</script>

<style scoped>
.btn {
  background-color: #4abdac !important;
  border-color: #4abdac !important;
  color: #fffefe !important;
  font-weight: bold !important;
}

.btn:hover {
  background-color: #fc4a1a !important;
  border-color: #fc4a1a !important;
  color: #fffefe !important;
}

.btn:disabled {
  background-color: #4abdac !important;
  border-color: #4abdac !important;
  opacity: 0.7 !important;
}
</style>