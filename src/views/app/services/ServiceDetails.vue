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
      <div class="col-xl-9 col-md-8, col-sm-8" style="border: 2px solid black;">
        <base-button text="<" @clicked="goBack"/>
        <p>{{ service.name }}</p>
        <p>{{ service.price }}</p>
        <p>{{ service.taxValue }}</p>
        <p>{{ service.minutesDuration }}</p>

        <!-- <base-button @clicked="navigateToClientEdit" text="Edit" />
        <base-button @clicked="deleteClient" text="Delete" /> -->
      </div>
    </div>

    <the-footer />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import LeftMenu from "../../../components/app/leftmenu/LeftMenu.vue";
import TheFooter from "../../../components/web-page/footer/TheFooter.vue";

export default {
  name: "ClientDetails",
  components: {
    BaseButton,
    LeftMenu,
    TheFooter
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let service = store.getters["work/getWork"];

    function goBack() {
      router.push("/services");
    }

    // function navigateToClientEdit() {
    //   router.push("/clients/edit/" + client.id);
    // }

    // async function deleteClient() {
    //   const studioId = parseInt(localStorage.getItem("studioId"));
    //   const params = {
    //     studioId,
    //     clientId: client.id
    //   }
    //   await store.dispatch(
    //     "client/deleteClient",
    //     params
    //   );
    //  router.push("/clients");
    // }


    return { service, goBack }
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