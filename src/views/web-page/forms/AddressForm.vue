<template>
  <form>
    <my-text-input
      placeholder="Country"
      @text-input-finished="handleCountryInput"
    />
    <my-text-input
      placeholder="Voivodeship"
      @text-input-finished="handleVoivodeshipInput"
    />
    <my-text-input placeholder="City" @text-input-finished="handleCityInput" />
    <my-text-input
      placeholder="Postal code"
      @text-input-finished="handlePostalCodeInput"
    />
    <my-text-input
      placeholder="Street"
      @text-input-finished="handleStreetInput"
    />
    <my-text-input
      placeholder="House number"
      @text-input-finished="handleHouseNumberInput"
    />

    <button
      @click.prevent="goBack"
      class="btn btn-primary"
      style="margin: 0 2rem"
    >
      Previous
    </button>
    <button
      type="submit"
      @click.prevent="handleSubmit"
      class="btn btn-primary"
      :disabled="!isFormValid"
      style="margin: 0 2rem"
    >
      Next
    </button>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import MyTextInput from "../../../components/common/inputs/MyTextInput.vue";

export default {
  components: { MyTextInput },
  setup(props, context) {
    const isFormValid = ref(false);

    const addressDto = reactive({
      country: "",
      voivodeship: "",
      city: "",
      postalCode: "",
      street: "",
      houseNumber: "",
    });

    function handleSubmit() {
      context.emit("addressDto-data", addressDto);
    }

    function handleCountryInput(value) {
      addressDto.country = value;
      validateForm();
    }

    function handleVoivodeshipInput(value) {
      addressDto.voivodeship = value;
      validateForm();
    }

    function handleCityInput(value) {
      addressDto.city = value;
      validateForm();
    }

    function handlePostalCodeInput(value) {
      addressDto.postalCode = value;
      validateForm();
    }

    function handleStreetInput(value) {
      addressDto.street = value;
      validateForm();
    }

    function handleHouseNumberInput(value) {
      addressDto.houseNumber = value;
      validateForm();
    }

    function goBack() {
      context.emit("go-back");
    }

    function validateForm() {
      let result = true;
      if (addressDto.country === "") {
        result = false;
      }
      if (addressDto.voivodeship === "") {
        result = false;
      }
      if (addressDto.city === "") {
        result = false;
      }
      if (addressDto.postalCode === "") {
        result = false;
      }
      if (addressDto.street === "") {
        result = false;
      }
      if (addressDto.houseNumber === "") {
        result = false;
      }

      result === true ? enableButton() : disableButton();
    }

    function enableButton() {
      isFormValid.value = true;
    }

    function disableButton() {
      isFormValid.value = false;
    }

    return {
      addressDto,
      handleSubmit,
      goBack,
      isFormValid,
      validateForm,
      handleCountryInput,
      handleVoivodeshipInput,
      handleCityInput,
      handlePostalCodeInput,
      handleStreetInput,
      handleHouseNumberInput,
    };
  },
};
</script>

<style scoped>
@import "./forms-style.css";
</style>
