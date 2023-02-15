<template>
  <div class="container" style="height: 100%">
    <div class="row header">
      <div class="col-5">
        <header>
          <h1>S-max</h1>
        </header>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-3 col-md-4 col-sm-4" style="height: 100%">
        <left-menu />
      </div>

      <VueCal
        id="vuecal"
        style="height: 720px"
        :time-from="6 * 60"
        :time-to="22 * 60"
        :time-step="30"
        :time-cell-height="60"
        :disable-views="['years', 'year']"
        @ready="scrollToCurrentTime"
        ref="vuecal"
      >
        >
      </VueCal>
    </div>

    <the-footer />
  </div>
</template>

<script>
import { ref } from "vue";
import LeftMenu from "../../../components/app/leftmenu/LeftMenu.vue";
import TheFooter from "../../../components/web-page/footer/TheFooter.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "Appointments",
  components: {
    LeftMenu,
    TheFooter,
    VueCal,
  },
  setup() {
    const currentDate = ref(new Date());

    function scrollToCurrentTime() {
      const calendar = document.querySelector("#vuecal .vuecal__bg");
      const hours = currentDate.value.getHours() + currentDate.value.getMinutes() / 60;
      calendar.scrollTo({
        top: hours * 60,
        behavior: "smooth",
      });
    }

    return { scrollToCurrentTime };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.header {
  height: 15% !important;
  text-align: left;
  padding: 1rem;
}

h1 {
  font-size: 6rem;
  font-weight: bolder;
  color: #4abdac;
}

.row {
  height: 100%;
  flex-wrap: nowrap;
}

.vuecal {
  padding: 0;
}

.vuecal__flex[column] {
  flex: none;
}

.vuecal__title-bar {
  background-color: blue !important;
}
</style>
