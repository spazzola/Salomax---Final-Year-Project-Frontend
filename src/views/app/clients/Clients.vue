<template>
  <client-add
    :showDialog="showClientAddDialog"
    @hide-dialog="hideDialog"
  />

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
            <base-button text="+ New client" @clicked="openClientAddDialog" />
          </div>
          <base-list-view
            class="col-xl-10"
            :items="clients"
            @item-clicked="navigateToClientDetails"
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
import ClientAdd from "./ClientAdd.vue";

export default {
  components: {
    LeftMenu,
    TheFooter,
    BaseListView,
    BaseButton,
    ClientAdd
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const clients = ref([]);
    const showClientAddDialog = ref(false);

    async function fetchData() {
      // loading.value = true;
      const studioId = localStorage.getItem("studioId");

      await store.dispatch("client/loadClients", studioId);
      const fetchedClients = store.getters["client/getAllClients"];
      clients.value = fetchedClients.map((client) => {
        return {
          title: client.name + " " + client.surname,
          id: client.id,
        };
      });
      // loading.value = false;
    }

    function navigateToClientDetails(event) {
      router.push("/clients/details/" + event.id);
    }

    function openClientAddDialog() {
      showClientAddDialog.value = true;
    }

    function hideDialog() {
      showClientAddDialog.value = false;
      fetchData();
    }

    onBeforeMount(async () => {
      await fetchData();
    });

    return {
      clients,
      navigateToClientDetails,
      showClientAddDialog,
      openClientAddDialog,
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