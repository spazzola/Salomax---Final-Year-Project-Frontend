<template>
  <div v-if="showDialog" @click="hideDialog">
    <!-- <div class="my-modal" @click.stop></div> -->
    <base-modal>
      <template #header class="header">
        <h2>{{ appointment.clientDto.name }} - {{ appointment.date }}</h2>
      </template>
      <template #content class="content">
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          "
        >
          <div class="column">
            <strong><p>Client details:</p></strong>
            <p>
              {{ appointment.clientDto.name }}
              {{ appointment.clientDto.surname }}
            </p>
            <p>{{ appointment.clientDto.phoneNumber }}</p>

            <strong><p>Note:</p></strong>
            <div
              style="width: 15rem; height: 100px; border: 1px solid black"
            ></div>
          </div>
          <div class="column">
            <strong><p>Employee details:</p></strong>
            <p>
              {{ appointment.employeeDto.name }}
              {{ appointment.employeeDto.surname }}
            </p>
            <p>{{ appointment.employeeDto.phoneNumber }}</p>

            <strong style="margin-top: 0.7rem"><p>Services:</p></strong>
            <p
              v-for="appointmentDetail in appointment.appointmentDetailsDto"
              :key="appointmentDetail.id"
            >
              {{ appointmentDetail.workDto.name }}
            </p>
          </div>
        </div>
        <div>
          <button @click="finishAppointment">Finish</button>
          <button @click="editAppointment">Edit</button>
          <button @click="deleteAppointment">Delete</button>
        </div>
      </template>
    </base-modal>
  </div>
</template>

<script>
import { useStore } from "vuex";
import BaseModal from "../../../components/common/dialogs/BaseModal.vue";

export default {
  components: { BaseModal },
  name: "AppointmentDetails",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    appointment: {
      type: Object,
      default: null,
    },
  },
  emits: ["hide-dialog", "open-edit-dialog"],
  setup(props, context) {
    const store = useStore();

    function hideDialog() {
      context.emit("hide-dialog");
    }

    async function finishAppointment() {
      await store.dispatch("appointment/finishAppointment", props.appointment.id);
    }

    function editAppointment() {
      context.emit("open-edit-dialog");
    }

    async function deleteAppointment() {
      await store.dispatch("appointment/deleteAppointment", props.appointment.id);
    }

    return { hideDialog, finishAppointment, editAppointment, deleteAppointment };
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 0 !important;
}

.header {
  display: flex !important;
}

strong {
  text-align: left;
  margin-bottom: 0.3rem;
}

.column {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
}

p {
  margin: 0;
}

/* section {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
} */
</style>