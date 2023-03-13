<template>
  <base-grow-spinner :loading="loading" />

  <div class="container">
    <div class="form-group">
      <my-text-input
        placeholder="Service's name"
        :defaultValue="name"
        @text-input-finished="handleNameInput"
      />
      <my-number-input
        placeholder="Price"
        :defaultValue="price"
        @text-input-finished="handlePriceInput"
      />
      <my-number-input
        placeholder="Tax value"
        :defaultValue="taxValue"
        @text-input-finished="handleTaxValueInput"
      />
      <my-number-input
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
import { ref, onBeforeMount } from "vue";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";
import BaseGrowSpinner from "../../../components/common/loading/BaseGrowSpinner.vue";
import MyTextInput from "../../../components/common/inputs/MyTextInput.vue";
import MyNumberInput from "../../../components/common/inputs/MyNumberInput.vue";

export default {
  name: "ServiceForm",
  components: { BaseButton, BaseGrowSpinner, MyTextInput, MyNumberInput },
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
      price.value = parseFloat(value);
    }

    function handleTaxValueInput(value) {
      taxValue.value = parseFloat(value);
    }

    function handleMinutesDurationInput(value) {
      minutesDuration.value = parseInt(value);
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

    function handleSubmitEdit() {
      if (validateForm()) {
        let studioId = localStorage.getItem("studioId");
        const updateServiceRequest = {
          id: props.service.id,
          name: name.value,
          price: price.value,
          taxValue: taxValue.value,
          minutesDuration: minutesDuration.value,
          iconName: "ToImplement",
          assignedStudioId: studioId,
        };

        context.emit("submit-edit-form", updateServiceRequest);
      } else {
        console.log("ERORR");
      }
    }

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

    function setUpValuesForEditing() {
      if (props.mode === "edit") {
        const service = props.service;
        name.value = service.name;
        price.value = service.price;
        taxValue.value = service.taxValue;
        minutesDuration.value = service.minutesDuration;
      }
    }

    onBeforeMount(async () => {
      setUpValuesForEditing();
    });

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
      handleSubmitEdit,
    };
  },
};
</script>

<style scoped>
</style>