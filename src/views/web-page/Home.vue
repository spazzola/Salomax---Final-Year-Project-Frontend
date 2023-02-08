<template>
  <nav-menu/>
  <div class="home">
    <h1>Hello World</h1>
  </div>
  <the-footer/>
</template>

<script>
// @ is an alias to /src
import NavMenu from "@/components/web-page/nav/NavMenu.vue";
import TheFooter from '@/components/web-page/footer/TheFooter.vue';

export default {
  name: "Home",
  components: {
    NavMenu,
    TheFooter
  },
};
</script>
