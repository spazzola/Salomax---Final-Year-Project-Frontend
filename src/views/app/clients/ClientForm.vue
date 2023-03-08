<template>
  <base-grow-spinner :loading="loading" />

  <div class="container">
    <div class="form-group">
      <my-text-input
        placeholder="Name"
        @text-input-finished="handleNameInput"
      />
      <my-text-input
        placeholder="Surname"
        @text-input-finished="handleSurnameInput"
      />
      <my-text-input
        placeholder="Phone number"
        @text-input-finished="handlePhoneNumberInput"
      />
      <my-text-input
        placeholder="Email"
        @text-input-finished="handleEmailInput"
      />
    </div>
    <base-button class="double-buttons" @clicked="handleCancel" text="Cancel" />
    <base-button @clicked="handleSubmitAdd" text="Create" />
  </div>
</template>

<script>
import { ref } from "vue";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import BaseGrowSpinner from "../../../components/common/loading/BaseGrowSpinner.vue";
import MyTextInput from "../../../components/common/inputs/MyTextInput.vue";

export default {
  name: "AppointmentForm",
  components: { BaseButton, BaseGrowSpinner, MyTextInput },
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
    const name = ref("");
    const surname = ref("");
    const phoneNumber = ref("");
    const email = ref("");


    function handleNameInput(value) {
      name.value = value;
    }

    function handleSurnameInput(value) {
      surname.value = value;
    }

    function handlePhoneNumberInput(value) {
      phoneNumber.value = value;
    }

    function handleEmailInput(value) {
      email.value = value;
    }

    function handleCancel() {
      context.emit("hide-dialog");
    }

    function handleSubmitAdd() {
      if (validateForm()) {
        let studioId = localStorage.getItem("studioId");
        const client = {
          name: name.value,
          surname: surname.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
          assignedStudioId: studioId
        };

        context.emit("submit-form", client);
      } else {
        console.log("SHOW ERROR TO USER");
      }
    }

    function validateForm() {
      if (name.value === undefined) {
        return false;
      }

      return true;
    }



    return {
      loading,
      handleNameInput,
      handleSurnameInput,
      handlePhoneNumberInput,
      handleEmailInput,
      handleCancel,
      handleSubmitAdd,
    };
  },
};
</script>

<style scoped>
</style>