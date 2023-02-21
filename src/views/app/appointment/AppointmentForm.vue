<template>
  <base-grow-spinner :loading="loading" />

  <div class="container">
    <div class="date-content">
      <VueDatePicker
        v-model="selectedStartDate"
        placeholder="Select start date"
        :format="formatDateForRequest"
      ></VueDatePicker>
      <div v-if="mode === 'edit'">
        <VueDatePicker
          v-model="selectedEndDate"
          placeholder="Select end date"
          :format="formatDateForRequest"
        ></VueDatePicker>
      </div>
    </div>

    <!-- <div class="date-content" v-if="mode === 'edit'">
      <div class="date-content">
        <VueDatePicker v-model="selectedEndDate" placeholder="Select end date" :format="formatDateForRequest"></VueDatePicker>
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
    <base-button v-if="mode === 'edit'" class="double-buttons" @clicked="handleSubmitEdit" text="Update" />
    <base-button v-else class="double-buttons" @clicked="handleSubmitAdd" text="Create" />
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
  emits: ["hide-dialog", "submit-form", "submit-edit-form"],
  props: {
    mode: {
      type: String,
      default: "add",
    },
    appointment: {
      type: Object,
      default: null,
    },
  },
  setup(props, context) {
    const loading = ref(false);

    const role = localStorage.getItem("role");
    const isAdmin = ref(role === 'ADMIN' || role === "OWNER");

    const store = useStore();

    let selectedStartDate = ref();
    let selectedEndDate = ref();

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

    function handleSubmitAdd() {
      if (validateForm()) {
        const workIds = selectedServices.value.map((work) => work.id);
        const startDate = formatDateForRequest(selectedStartDate.value);
        let studioId = localStorage.getItem("studioId");
        let employeeId = localStorage.getItem("id");
        const createAppointmentRequest = {
          startDate,
          note: note.value,
          studioId,
          clientId: selectedClient.value.id,
          employeeId,
          workIds,
        };

        context.emit("submit-form", createAppointmentRequest);
      } else {
        console.log("SHOW ERROR TO USER");
      }
    }

    function handleSubmitEdit() {
      if (validateForm()) {
        console.log(selectedStartDate.value);
        let startDate = new Date(selectedStartDate.value);
        let endDate = new Date(selectedEndDate.value);
        startDate = formatDateForRequest(startDate);
        endDate = formatDateForRequest(endDate);
        const workIds = selectedServices.value.map((work) => work.id);
        let studioId = localStorage.getItem("studioId");
        const updateAppointmentRequest = {
          id: props.appointment.id,
          startDate,
          endDate,
          note: note.value,
          studioId,
          clientId: selectedClient.value.id,
          employeeId: selectedEmployee.value.id,
          workIds
        }

        context.emit("submit-edit-form", updateAppointmentRequest);
      } else {
        console.log("SHOW ERROR TO USER");
      }
    }

    function formatDateForRequest(date) {
      const day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      let minutes = date.getMinutes();

      if (month < 10) {
        month = "0" + month;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    function formatDateForView(date) {
      const day = date.substring(0, 2);
      const month = date.substring(3, 5);
      const year = date.substring(6, 10);
      const hour = date.substring(11, 13);
      const minute = date.substring(14, 16);

      return `${year}/${month}/${day} ${hour}:${minute}`;
    }

    function validateForm() {
      if (selectedStartDate.value === undefined) {
        return false;
      }
      if (props.mode === "edit" && selectedEndDate.value === undefined) {
        return false;
      }
      if (selectedClient.value === undefined) {
        return false;
      }
      if (
        selectedServices.value === undefined ||
        selectedServices.value.length === 0
      ) {
        return false;
      }
      if (
        selectedEmployee.value === undefined ||
        selectedEmployee.value == null
      ) {
        return false;
      }

      return true;
    }

    function setUpValuesForEditing() {
      if (props.mode === "edit") {
        const appointment = props.appointment;
        selectedStartDate.value = formatDateForView(appointment.startDate);
        selectedEndDate.value = formatDateForView(appointment.endDate);
        selectedClient.value = clients.value.find((client) => client.id = appointment.clientDto.id);
        const appointmentDetails = appointment.appointmentDetailsDto;
        selectedServices.value = services.value.filter(service => appointmentDetails.some(el => el.workDto.id === service.id));
        selectedEmployee.value = employees.value.find((employee) => employee.id = appointment.employeeDto.id);
        note.value = appointment.note;
      }
    }

    onBeforeMount(async () => {
      await fetchData();
      setUpValuesForEditing();
    });

    return {
      loading,
      isAdmin,
      selectedStartDate,
      selectedEndDate,
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
      handleSubmitAdd,
      handleSubmitEdit,
      formatDateForRequest,
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
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.double-buttons {
  margin: 0 2rem;
}
</style>