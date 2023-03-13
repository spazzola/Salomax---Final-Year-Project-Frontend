<template>
  <base-grow-spinner :loading="loading" />

  <div v-if="showDialog" @click="hideDialog">
    <base-modal>
      <template #header class="header">
        <h2>New service</h2>
      </template>
      <template #content class="content">
        <service-form @cancel="hideDialog" @submit-form="submitForm" />
      </template>
    </base-modal>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import BaseModal from "../../../components/common/dialogs/BaseModal.vue";
import ServiceForm from "./ServiceForm.vue";
import BaseGrowSpinner from "../../../components/common/loading/BaseGrowSpinner.vue";

export default {
  name: "ServiceAdd",
  emits: ["hide-dialog"],
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseModal,
    ServiceForm,
    BaseGrowSpinner,
  },
  setup(props, context) {
    const loading = ref(false);

    const store = useStore();
    function hideDialog() {
      context.emit("hide-dialog");
    }

    async function submitForm(service) {
      loading.value = true;
      let response = await store.dispatch(
        "work/addWork",
        service
      );
      loading.value = false;
      if (response.status === 200) {
        hideDialog();
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