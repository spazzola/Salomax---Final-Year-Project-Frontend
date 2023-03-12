<template>
  <div>
    <base-search-bar @search="updateSearch" :search-term="enteredSearchTerm" />
    <ul>
      <li
        v-for="(item, index) in displayedItems"
        :key="index"
        @click="handleItemClick(item)"
        :style="
          index % 2 === 0
            ? 'background-color: white;'
            : 'background-color: grey;'
        "
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import BaseSearchBar from "./BaseSearchBar.vue";

export default {
  name: "BaseListView",
  components: {
    BaseSearchBar,
  },
  props: {
    items: {
      type: Array,
      default: null,
    },
  },
  setup(props, context) {
    const enteredSearchTerm = ref("");
    const activeSearchTerm = ref("");

    function updateSearch(val) {
      enteredSearchTerm.value = val;
    }

    const displayedItems = computed(() => {
      if (enteredSearchTerm.value !== "") {
        return props.items.filter((itm) =>
          itm.title.includes(activeSearchTerm.value)
        );
      } else {
        return props.items.slice().sort((i1, i2) => {
          if (i1.title > i2.title) {
            return 1;
          } else {
            return -1;
          }
        });
      }
    });

    watch(enteredSearchTerm, (val) => {
      setTimeout(() => {
        if (val === enteredSearchTerm.value) {
          activeSearchTerm.value = val;
        }
      }, 300);
    });

    function handleItemClick(item) {
      context.emit("item-clicked", item);
    }

    return {
      displayedItems,
      enteredSearchTerm,
      updateSearch,
      handleItemClick,
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