<template>
  <base-grow-spinner :loading="loading" />

  <div class="container">
    <div class="form-group">
      <my-text-input
        placeholder="Name"
        :defaultValue="name"
        @text-input-finished="handleNameInput"
      />
      <my-text-input
        placeholder="Surname"
        :defaultValue="surname"
        @text-input-finished="handleSurnameInput"
      />
      <my-text-input
        placeholder="Phone number"
        :defaultValue="phoneNumber"
        @text-input-finished="handlePhoneNumberInput"
      />
      <my-text-input
        placeholder="Email"
        :defaultValue="email"
        @text-input-finished="handleEmailInput"
      />
    </div>
    <base-button class="double-buttons" @clicked="handleCancel" text="Cancel" />
    <base-button
      v-if="mode === 'edit'"
      class="double-buttons"
      @clicked="handleSubmitEdit"
      text="Update"
    />
    <base-button
      v-else
      class="double-buttons"
      @clicked="handleSubmitAdd"
      text="Create"
    />
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import BaseGrowSpinner from "../../../components/common/loading/BaseGrowSpinner.vue";
import MyTextInput from "../../../components/common/inputs/MyTextInput.vue";

export default {
  name: "ClientForm",
  components: { BaseButton, BaseGrowSpinner, MyTextInput },
  emits: ["cancel", "submit-form", "submit-edit-form"],
  props: {
    mode: {
      type: String,
      default: "add",
    },
    client: {
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
      context.emit("cancel");
    }

    function handleSubmitAdd() {
      if (validateForm()) {
        let studioId = localStorage.getItem("studioId");
        const client = {
          name: name.value,
          surname: surname.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
          assignedStudioId: studioId,
        };

        context.emit("submit-form", client);
      } else {
        console.log("SHOW ERROR TO USER");
      }
    }

    function handleSubmitEdit() {
      if (validateForm()) {
        let studioId = localStorage.getItem("studioId");
        const updateClientRequest = {
          id: props.client.id,
          name: name.value,
          surname: surname.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
          assignedStudioId: studioId,
        };

        context.emit("submit-edit-form", updateClientRequest);
      } else {
        console.log("ERORR");
      }
    }

    function validateForm() {
      if (name.value === "") {
        return false;
      }
      if (surname.value === "") {
        return false;
      }
      if (phoneNumber.value === "") {
        return false;
      }
      if (email.value === "") {
        return false;
      }

      return true;
    }

    function setUpValuesForEditing() {
      if (props.mode === "edit") {
        const client = props.client;
        name.value = client.name;
        surname.value = client.surname;
        phoneNumber.value = client.phoneNumber;
        email.value = client.email;
      }
    }

    onBeforeMount(async () => {
      setUpValuesForEditing();
    });

    return {
      loading,
      name,
      surname,
      phoneNumber,
      email,
      handleNameInput,
      handleSurnameInput,
      handlePhoneNumberInput,
      handleEmailInput,
      handleCancel,
      handleSubmitAdd,
      handleSubmitEdit,
    };
  },
};
</script>

<style scoped>
</style>