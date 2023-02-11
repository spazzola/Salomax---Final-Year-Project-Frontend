<template>
  <nav-menu />
  <div>
    <h1>Features content</h1>
  </div>
  <the-footer />
</template>

<script>
import NavMenu from "@/components/web-page/nav/NavMenu.vue";
import TheFooter from "@/components/web-page/footer/TheFooter.vue";

export default {
  name: "Features",
  components: {
    NavMenu,
    TheFooter,
  },
};
</script>

<style scoped>
</style>