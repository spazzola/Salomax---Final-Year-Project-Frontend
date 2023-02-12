<template>
  <div class="form-group">
    <input :value="inputValue" :placeholder="placeholder" :isValid="isValid" @input="emitEvent" class="form-control" :class="{invalid: !isValid}" :type="type"/>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MyInput',
  props: {
    placeholder: {
      type: String,
      default: 'text'
    },
    isValid: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const inputValue = ref(props.value || '');


    function updateValue(event) {
      inputValue.value = event.target.value;
    }

    function emitEvent(event) {
      inputValue.value = event.target.value;
      context.emit('text-input-finished', inputValue.value);
    }

    return {
      inputValue,
      updateValue,
      emitEvent
    };
  }
};
</script>

<style scoped>
.form-control {
  border: 2px solid #4abdac;
  border-radius: 5px;
}

.form-control:active,
.form-control:focus {
  border-color: transparent;
  border: 2px solid #4abdac;
  box-shadow: 0 0 10px #4abdac;
}

.invalid {
   border: 2px solid #FC4A1A !important;
  animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px #4abdac;
  }
  to {
    box-shadow: 0 0 20px #FC4A1A;
  }
}
</style>
