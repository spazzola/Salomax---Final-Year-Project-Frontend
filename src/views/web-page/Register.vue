<template>
    <nav-menu/>
    <div>
        Register content
    </div>
    <the-footer/>
</template>

<script>
import NavMenu from "@/components/web-page/nav/NavMenu.vue";
import TheFooter from '@/components/web-page/footer/TheFooter.vue';

export default {
  name: "Register",
  components: {
    NavMenu,
    TheFooter
  },
};
</script>

<style scoped>

</style>