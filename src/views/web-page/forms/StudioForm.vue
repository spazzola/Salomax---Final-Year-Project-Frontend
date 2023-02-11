<template>
  <form>
    <div class="form-group">
      <input
        type="text"
        id="studioName"
        name="studioName"
        v-model="studioDto.name"
        @input="validateForm"
        placeholder="Name"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="nip"
        name="studioNIP"
        v-model="studioDto.nip"
        @input="validateForm"
        placeholder="NIP"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="regon"
        name="studioREGON"
        v-model="studioDto.regon"
        @input="validateForm"
        placeholder="REGON"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="tel"
        id="phoneNumberId"
        name="studioPhoneNumber"
        v-model="studioDto.phoneNumber"
        @input="validateForm"
        placeholder="Phone number"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="email"
        id="emailId"
        name="studioEmail"
        v-model="studioDto.email"
        @input="validateForm"
        placeholder="Email"
        class="form-control"
        required
      />
    </div>
    <button
      @click.prevent="handleSubmit"
      class="btn btn-primary"
      :disabled="!isFormValid"
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

    const studioDto = reactive({
      name: "",
      nip: "",
      regon: "",
      phoneNumber: "",
      email: "",
      addressDto: {
        country: "",
        voivodeship: "",
        city: "",
        postalCode: "",
        street: "",
        houseNumber: "",
      },
    });

    function handleSubmit() {
      context.emit("studioDto-data", studioDto);
    }

    function validateForm() {
      let result = true;
      if (studioDto.name === "") {
        result = false;
      }
      if (studioDto.nip === "") {
        result = false;
      }
      if (studioDto.regon === "") {
        result = false;
      }
      if (studioDto.phoneNumber === "") {
        result = false;
      }
      if (!validateEmail(studioDto.email)) {
        result = false;
      }

      result === true ? enableButton() : disableButton();
    }
    
    function validateEmail(value) {
      const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value);
    }

    function enableButton() {
      isFormValid.value = true;
    }

    function disableButton() {
      isFormValid.value = false;
    }

    return { isFormValid, studioDto, handleSubmit, validateForm };
  },
};
</script>

<style scoped>
@import './forms-style.css'
</style>