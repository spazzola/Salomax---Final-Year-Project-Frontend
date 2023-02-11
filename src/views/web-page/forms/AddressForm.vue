<template>
  <form>
    <div class="form-group">
      <input
        type="text"
        id="country"
        name="addressCountry"
        v-model="addressDto.country"
        placeholder="Country"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="voivodeship"
        name="voivodeship"
        v-model="addressDto.voivodeship"
        @input="validateForm"
        placeholder="Voivodeship"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="city"
        name="addressCity"
        v-model="addressDto.city"
        @input="validateForm"
        placeholder="City"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="postalCode"
        name="addressPostalCode"
        v-model="addressDto.postalCode"
        @input="validateForm"
        placeholder="Postal code"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="street"
        name="addressStreet"
        v-model="addressDto.street"
        @input="validateForm"
        placeholder="Street"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="houseNumber"
        name="addressHouseNumber"
        v-model="addressDto.houseNumber"
        @input="validateForm"
        placeholder="House number"
        class="form-control"
        required
      />
    </div>

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

export default {
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
    
    return { addressDto, handleSubmit, goBack, isFormValid, validateForm };
  },
};
</script>

<style scoped>
@import "./forms-style.css";
</style>
