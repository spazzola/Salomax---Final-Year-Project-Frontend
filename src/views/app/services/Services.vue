<template>
  <service-add :showDialog="showServiceAddDialog" @hide-dialog="hideDialog" />
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
        <div class="row">
          <div class="col-xl-2">
            <base-button text="+ New service" @clicked="openServiceAddDialog" />
          </div>
          <base-list-view
            class="col-xl-10"
            :items="services"
            @item-clicked="navigateToServiceDetails"
          />
        </div>
      </div>
    </div>

    <the-footer />
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LeftMenu from "../../../components/app/leftmenu/LeftMenu.vue";
import TheFooter from "../../../components/web-page/footer/TheFooter.vue";
import BaseListView from "../../../components/app/list-view/BaseListView.vue";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import ServiceAdd from "./ServiceAdd.vue";

export default {
  components: {
    LeftMenu,
    TheFooter,
    BaseListView,
    BaseButton,
    ServiceAdd
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const services = ref([]);
    const showServiceAddDialog = ref(false);

    async function fetchData() {
      const studioId = localStorage.getItem("studioId");

      await store.dispatch("work/loadWorks", studioId);
      const fetchedServices = store.getters["work/getAllWorks"];
      services.value = fetchedServices.map((service) => {
        return {
          title:
            service.name +
            " - " +
            service.minutesDuration +
            "min, £" +
            service.price,
          id: service.id,
        };
      });
    }

    function navigateToServiceDetails(event) {
      const selectedService = store.getters["work/getAllWorks"].find(
        (w) => w.id === event.id
      );
      store.dispatch("work/setWork", selectedService);
      router.push("/services/details/" + selectedService.id);
    }

    function openServiceAddDialog() {
      showServiceAddDialog.value = true;
    }

    function hideDialog() {
      showServiceAddDialog.value = false;
      fetchData();
    }

    onBeforeMount(async () => {
      await fetchData();
    });

    return {
      services,
      navigateToServiceDetails,
      openServiceAddDialog,
      showServiceAddDialog,
      hideDialog
    };
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