<template>
  <div class="progress-bar">
    <div class="progress-bar-fill" :style="{ width: `${percent.toFixed(2)}%` }">
      <h2>{{ nameToDisplay }}</h2>
    </div>
  </div>
</template>

<script>
import { ref, onUpdated } from "vue";

export default {
  name: 'BaseProgressBar',
  props: {
    currentName: {
      type: String,
      default: ''
    },
    percentProgress: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const percent = ref(props.percentProgress);
    const nameToDisplay = ref(props.currentName);

    onUpdated(() => {
      percent.value = props.percentProgress;
      nameToDisplay.value = props.currentName;
    })

    return { percent, nameToDisplay }
  },
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 3rem;
  background-color: #ddd;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
}

.progress-bar-fill {
  height: 100%;
  background-color: #fc4a1a;
  border-radius: 5px;
  transition: width 0.25s ease-in-out;
  display: flex;
  justify-content: center;
  border-color: transparent;
  border: 2px solid #fc4a1a;
  box-shadow: 0 0 10px #fc4a1a;
}

h2 {
  color: #fffefe;
}
</style>