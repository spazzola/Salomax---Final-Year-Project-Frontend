<template>
  <div>
    <div style="border-bottom: 2px solid red; height: 50px;">
      Search bar
    </div>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="handleItemClick(item)"
        :style="index % 2 === 0 ? 'background-color: white;' : 'background-color: grey;'"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BaseListView",
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  setup(props, context) {
    function handleItemClick(item) {
      context.emit("item-clicked", item)
    }

    return {
      handleItemClick
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  text-align: left;
  padding: 0;
  max-height: 680px;
  overflow: auto;
}

li {
  font-size: 1.5rem;
}

li:hover {
  cursor: pointer;
}

</style>