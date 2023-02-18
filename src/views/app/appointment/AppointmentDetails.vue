<template>
  <div v-if="showDialog" @click="hideDialog">
    <!-- <div class="my-modal" @click.stop></div> -->
    <base-modal>
      <template #header class="header">
        <h2>{{ appointment.clientDto.name }} - {{ appointment.date }}</h2>
      </template>
      <template #content class="content">
        <div style="display: flex; flex-direction: row; justify-content: space-around;">
          <div class="left-content">
            <strong><p>Client details:</p></strong>
            <p>
              {{ appointment.clientDto.name }}
              {{ appointment.clientDto.surname }}
            </p>
            <p>{{ appointment.clientDto.phoneNumber }}</p>

            <strong style="margin-top: 0.7rem"><p>Services:</p></strong>
            <p v-for="work in appointment.appointmentDetailsDto" :key="work.id">
              {{ work.name }}
            </p>
          </div>
          <div class="right-content">
            <strong><p>Note:</p></strong>
          </div>
        </div>
      </template>
    </base-modal>
  </div>
</template>

<script>
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
  setup(props, context) {
    function hideDialog() {
      context.emit("hide-dialog");
    }

    return { hideDialog };
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

.left-content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
}

.righ-content {
  width: 100%;
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