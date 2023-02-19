<template>
  <base-grow-spinner :loading="loading" />

  <div class="container">
    <div class="date-content">
      <div class="date-content">
        <VueDatePicker
          v-model="selectedStartDate"
          placeholder="Select start date"
          :format="formatDate"
        ></VueDatePicker>
      </div>
    </div>

    //ADD END DATE FOR EDIT
    <!-- <div class="date-content" v-if="false">
      <div class="date-content">
        <label>Select start date</label>
        <VueDatePicker v-model="selectedStartDate"></VueDatePicker>
      </div>
    </div> -->

    <div class="form-group">
      <multiselect
        searchable
        placeholder="Select a client"
        v-model="selectedClient"
        :custom-label="userFullName"
        :options="clients"
      ></multiselect>
      <p>Client doesn't exist? <strong>Create new</strong></p>
    </div>

    <div>
      <multiselect
        multiple
        searchable
        placeholder="Select services"
        v-model="selectedServices"
        :custom-label="workNamePriceDuration"
        :options="services"
        track-by="id"
      ></multiselect>
      <p>Work doesn't exist? <strong>Create new</strong></p>
    </div>

    <div v-if="isAdmin">
      <multiselect
        searchable
        placeholder="Select an employee"
        v-model="selectedEmployee"
        :custom-label="userFullName"
        :options="employees"
      ></multiselect>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Add a note</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        v-model="note"
      ></textarea>
    </div>
    <base-button class="double-buttons" @clicked="handleCancel" text="Cancel" />
    <base-button class="double-buttons" @clicked="handleSubmit" text="Create" />
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import BaseGrowSpinner from "../../../components/common/loading/BaseGrowSpinner.vue";

export default {
  name: "AppointmentForm",
  components: { BaseButton, BaseGrowSpinner },
  setup(props, context) {
    const loading = ref(false);
    const isAdmin = ref(true);
    const store = useStore();
    let selectedStartDate = ref();
    const selectedClient = ref();
    let clients = ref([]);
    let selectedServices = ref();
    let services = ref([]);
    const selectedEmployee = ref();
    let employees = ref([]);
    const note = ref("");

    async function fetchData() {
      loading.value = true;
      
      await store.dispatch("client/loadClients", 1);
      clients.value = store.getters["client/getAllClients"];

      await store.dispatch("work/loadWorks", 1);
      services.value = store.getters["work/getAllWorks"];

      await store.dispatch("employee/loadEmployees", 1);
      employees.value = store.getters["employee/getAllEmployees"];

      loading.value = false;
    }

    function userFullName({ name, surname }) {
      return `${name} ${surname}`;
    }

    function workNamePriceDuration({ name, price, minutesDuration }) {
      return `${name} £${price} ${minutesDuration}min`;
    }

    function handleCancel() {
      context.emit("hide-dialog");
    }

    function handleSubmit() {
      const workIds = selectedServices.value.map((work) => work.id);
      const startDate = formatDate(selectedStartDate.value);

      const createAppointmentRequest = {
        startDate,
        note: note.value,
        studioId: 1,
        clientId: selectedClient.value.id,
        employeeId: 1,
        workIds,
      };

      context.emit("submit-form", createAppointmentRequest);
    }

    function formatDate(date) {
      const day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      if (month < 10) {
        month = "0" + month;
      }

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    onBeforeMount(() => {
      fetchData();
    });

    return {
      isAdmin,
      selectedStartDate,
      clients,
      selectedClient,
      services,
      selectedServices,
      employees,
      selectedEmployee,
      userFullName,
      workNamePriceDuration,
      note,
      handleCancel,
      handleSubmit,
      formatDate,
    };
  },
};
</script>

<style scoped>
.container {
  height: 35rem;
}

.date-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.double-buttons {
  margin: 0 2rem;
}
</style>