<template>
  <base-grow-spinner :loading="loading" />
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
      <div class="col-xl-9 col-md-8, col-sm-8" style="border: 2px solid black">
        <service-form
          @cancel="goBack"
          @submit-edit-form="submitForm"
          :mode="'edit'"
          :service="service"
        />
      </div>
    </div>

    <the-footer />
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ServiceForm from "./ServiceForm.vue";
import LeftMenu from "../../../components/app/leftmenu/LeftMenu.vue";
import TheFooter from "../../../components/web-page/footer/TheFooter.vue";
import BaseGrowSpinner from "../../../components/common/loading/BaseGrowSpinner.vue";

export default {
  name: "ServiceEdit",
  props: {
    selectedService: {
      type: Object,
      default: null,
    },
    id: {
      String: Number,
      default: null
    }
  },
  components: {
    ServiceForm,
    LeftMenu,
    TheFooter,
    BaseGrowSpinner,
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const store = useStore();
    const service = store.getters["work/getWork"];

    async function submitForm(updateServiceRequest) {
      loading.value = true;
      let response = await store.dispatch(
        "work/editWork",
        updateServiceRequest
      );
      loading.value = false;
      if (response.status === 200) {
        store.dispatch("work/setWork", updateServiceRequest);
        router.push("/services/details/" + updateServiceRequest.id);
      } else {
        console.log(response);
      }
    }

    function goBack() {
      router.go(-1);
    }

    return { submitForm, loading, service, goBack };
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
}
</style>