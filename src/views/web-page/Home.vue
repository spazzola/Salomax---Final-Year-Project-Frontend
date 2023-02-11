<template>
  <nav-menu />
  <div>
    <h1>Home content</h1>
  </div>
  <the-footer />
</template>

<script>
// @ is an alias to /src
import NavMenu from "@/components/web-page/nav/NavMenu.vue";
import TheFooter from "@/components/web-page/footer/TheFooter.vue";

export default {
  name: "Home",
  components: {
    NavMenu,
    TheFooter,
  },
};
</script>
