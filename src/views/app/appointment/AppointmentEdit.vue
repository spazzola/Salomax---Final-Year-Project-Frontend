<template>
  <base-grow-spinner :loading="loading" />

  <div v-if="showDialog" @click="hideDialog">
    <base-modal>
      <template #header class="header">
        <h2>Edit appointment</h2>
      </template>
      <template #content class="content">
        <appointment-form
          @hide-dialog="hideDialog"
          @submit-edit-form="submitForm"
          :mode="'edit'"
          :appointment="appointment"
        />
      </template>
    </base-modal>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import BaseModal from "../../../components/common/dialogs/BaseModal.vue";
import AppointmentForm from "./AppointmentForm.vue";
import BaseGrowSpinner from "../../../components/common/loading/BaseGrowSpinner.vue";

export default {
  name: "AppointmentEdit",
  emits: ["hide-dialog"],
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    selectedAppointment: {
      type: Object,
      default: null,
    },
  },
  components: {
    BaseModal,
    AppointmentForm,
    BaseGrowSpinner,
  },
  setup(props, context) {
    const loading = ref(false);
    let appointment = ref(props.selectedAppointment);
    const store = useStore();

    appointment.value = store.getters["appointment/getAllAppointments"].find(
      (appointment) => appointment.id === props.selectedAppointment.id
    );
    
    function hideDialog() {
      context.emit("hide-dialog");
    }

    async function submitForm(updateAppointmentRequest) {
      loading.value = true;
      let response = await store.dispatch(
        "appointment/editAppointment",
        updateAppointmentRequest
      );
      loading.value = false;
      if (response.status === 200) {
        hideDialog();
      } else {
        console.log(response);
      }
    }

    return { hideDialog, submitForm, loading, appointment };
  },
};
</script>

<style scoped>
.content {
  height: 50rem;
}
</style>