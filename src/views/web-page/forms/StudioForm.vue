<template>
  <form>
    <my-text-input placeholder="Name" @text-input-finished="handleNameInput" />
    <my-text-input placeholder="NIP" @text-input-finished="handleNipInput" :isValid="isNipValid"/>
    <my-text-input
      placeholder="REGON"
      @text-input-finished="handleRegonInput"
      :isValid="isRegonValid"
    />
    <my-text-input
      placeholder="Phone number"
      @text-input-finished="handlePhoneNumberInput"
    />
    <my-text-input
      placeholder="Email"
      @text-input-finished="handleEmailInput"
      :isValid="isEmailValid"
    />

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
import MyTextInput from "../../../components/common/inputs/MyTextInput.vue";

export default {
  components: { MyTextInput },
  setup(props, context) {
    const isFormValid = ref(false);
    const isEmailValid = ref(true);
    const isNipValid = ref(true);
    const isRegonValid = ref(true);

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

    function handleNameInput(value) {
      studioDto.name = value;
      validateForm();
    }

    function handleNipInput(value) {
      if (value.length != 10 && value.length != 0) {
        isNipValid.value = false;
      } else {
        isNipValid.value = true;
      }
      studioDto.nip = value;
      validateForm();
    }

    function handleRegonInput(value) {
      if (value.length != 0 && value.length != 9 && value.length != 14) {
        isRegonValid.value = false;
      } else {
        isRegonValid.value = true;
      }
      studioDto.regon = value;
      validateForm();
    }

    function handlePhoneNumberInput(value) {
      studioDto.phoneNumber = value;
      validateForm();
    }

    function handleEmailInput(value) {
      if (!validateEmail(value)) {
        isEmailValid.value = false;
        disableButton();
      } else {
        isEmailValid.value = true;
      }
      studioDto.email = value;
      validateForm();
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
      if (studioDto.email === "" || !validateEmail(studioDto.email)) {
        result = false;
      }

      result === true ? enableButton() : disableButton();
    }

    function validateEmail(value) {
      if (value.length > 0 && value.charAt(0) !== " ") {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value);
      } else {
        return true;
      }
    }

    function enableButton() {
      isFormValid.value = true;
    }

    function disableButton() {
      isFormValid.value = false;
    }

    return {
      isFormValid,
      isEmailValid,
      isNipValid,
      isRegonValid,
      studioDto,
      handleSubmit,
      validateForm,
      handleNameInput,
      handleNipInput,
      handleRegonInput,
      handlePhoneNumberInput,
      handleEmailInput,
    };
  },
};
</script>

<style scoped>
@import "./forms-style.css";
</style>