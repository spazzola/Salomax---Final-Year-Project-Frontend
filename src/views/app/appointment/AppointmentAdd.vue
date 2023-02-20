<template>
  <base-grow-spinner :loading="loading" />

  <div v-if="showDialog" @click="hideDialog">
    <base-modal>
      <template #header class="header">
        <h2>New appointment</h2>
      </template>
      <template #content class="content">
        <appointment-form @hide-dialog="hideDialog" @submit-form="submitForm" />
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
  name: "AppointmentAdd",
  emits: ['hide-dialog'],
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseModal,
    AppointmentForm,
    BaseGrowSpinner
  },
  setup(props, context) {
    const loading = ref(false);

    const store = useStore();
    function hideDialog() {
      context.emit("hide-dialog");
    }

    async function submitForm(createAppointmentRequest) {
      loading.value = true;
      let response = await store.dispatch(
        "appointment/addAppointment",
        createAppointmentRequest
      );
      loading.value = false;
      if (response.status === 200) {
        //go to appointments and update appointments list
      } else {
        console.log(response);
      }
    }

    return { hideDialog, submitForm, loading };
  },
};
</script>

<style scoped>
.content {
  height: 50rem;
}
</style>