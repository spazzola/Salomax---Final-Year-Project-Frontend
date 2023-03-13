<template>
  <base-grow-spinner :loading="loading" />

  <div class="container">
    <div class="form-group">
      <my-text-input
        placeholder="Service's name"
        :defaultValue="name"
        @text-input-finished="handleNameInput"
      />
      <my-text-input
        placeholder="Price"
        :defaultValue="price"
        @text-input-finished="handlePriceInput"
      />
      <my-text-input
        placeholder="Tax value"
        :defaultValue="taxValue"
        @text-input-finished="handleTaxValueInput"
      />
      <my-text-input
        placeholder="Minutes duration"
        :defaultValue="minutesDuration"
        @text-input-finished="handleMinutesDurationInput"
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
import { ref } from "vue";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import BaseGrowSpinner from "../../../components/common/loading/BaseGrowSpinner.vue";
import MyTextInput from "../../../components/common/inputs/MyTextInput.vue";

export default {
  name: "ServiceForm",
  components: { BaseButton, BaseGrowSpinner, MyTextInput },
  emits: ["cancel", "submit-form", "submit-edit-form"],
  props: {
    mode: {
      type: String,
      default: "add",
    },
    service: {
      type: Object,
      default: null,
    },
  },
  setup(props, context) {
    const loading = ref(false);
    const name = ref("");
    const price = ref();
    const taxValue = ref();
    const minutesDuration = ref();

    function handleNameInput(value) {
      name.value = value;
    }

    function handlePriceInput(value) {
      price.value = value;
    }

    function handleTaxValueInput(value) {
      taxValue.value = value;
    }

    function handleMinutesDurationInput(value) {
      minutesDuration.value = value;
    }

    function handleCancel() {
      context.emit("cancel");
    }

    function handleSubmitAdd() {
      if (validateForm()) {
        let studioId = localStorage.getItem("studioId");
        const service = {
          name: name.value,
          price: price.value,
          taxValue: taxValue.value,
          minutesDuration: minutesDuration.value,
          iconName: "ToImplement",
          assignedStudioId: studioId,
        };

        context.emit("submit-form", service);
      } else {
        console.log("SHOW ERROR TO USER");
      }
    }

    // function handleSubmitEdit() {
    //   if (validateForm()) {
    //     let studioId = localStorage.getItem("studioId");
    //     const updateClientRequest = {
    //       id: props.client.id,
    //       name: name.value,
    //       surname: surname.value,
    //       phoneNumber: phoneNumber.value,
    //       email: email.value,
    //       assignedStudioId: studioId,
    //     };

    //     context.emit("submit-edit-form", updateClientRequest);
    //   } else {
    //     console.log("ERORR");
    //   }
    // }

    function validateForm() {
      if (name.value === "") {
        return false;
      }
      if (price.value < 0) {
        return false;
      }
      if (taxValue.value < 0) {
        return false;
      }
      if (minutesDuration.value <= 0) {
        return false;
      }

      return true;
    }

    // function setUpValuesForEditing() {
    //   if (props.mode === "edit") {
    //     const client = props.client;
    //     name.value = client.name;
    //     surname.value = client.surname;
    //     phoneNumber.value = client.phoneNumber;
    //     email.value = client.email;
    //   }
    // }

    // onBeforeMount(async () => {
    //   setUpValuesForEditing();
    // });

    return {
      loading,
      name,
      price,
      taxValue,
      minutesDuration,
      handleNameInput,
      handlePriceInput,
      handleTaxValueInput,
      handleMinutesDurationInput,
      handleCancel,
      handleSubmitAdd,
      // handleSubmitEdit,
    };
  },
};
</script>

<style scoped>
</style>