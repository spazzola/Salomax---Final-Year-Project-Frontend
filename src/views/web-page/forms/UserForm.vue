<template>
  <form>
    <my-text-input placeholder="Name" @text-input-finished="handleNameInput" />
    <my-text-input
      placeholder="Surname"
      @text-input-finished="handleSurnameInput"
    />
    <my-text-input
      placeholder="Login"
      @text-input-finished="handleLoginInput"
    />
    <my-text-input
      placeholder="Password"
      type="password"
      :isValid="isPasswordValid"
      @text-input-finished="handlePasswordInput"
    />
    <small id="passwordHelpBlock" class="form-text text-muted">
      Your password must be at least 6 characters long, contain big and small
      letters, numbers and special characters, <br />
      and must not contain spaces.
    </small>
    <my-text-input
      placeholder="Phone number"
      @text-input-finished="handlePhoneNumberInput"
    />
    <my-text-input
      placeholder="Email"
      @text-input-finished="handleEmailInput"
      :isValid="isEmailValid"
    />

    <base-button class="double-buttons" text="Previous" @clicked="goBack"/>
    <base-button class="double-buttons" text="Create" :disabled="!isFormValid" @clicked="handleSubmit" />
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import MyTextInput from "../../../components/common/inputs/MyTextInput.vue";
import BaseButton from "../../../components/common/buttons/BaseButton.vue";

export default {
  components: { MyTextInput, BaseButton },
  setup(props, context) {
    const isFormValid = ref(false);
    const isEmailValid = ref(true);
    const isPasswordValid = ref(true);

    const employeeDto = reactive({
      name: "",
      surname: "",
      login: "",
      password: "",
      phoneNumber: "",
      email: "",
    });

    function handleSubmit() {
      context.emit("submit", employeeDto);
    }

    function handleNameInput(value) {
      employeeDto.name = value;
      validateForm();
    }

    function handleSurnameInput(value) {
      employeeDto.surname = value;
      validateForm();
    }

    function handleLoginInput(value) {
      employeeDto.login = value;
      validateForm();
    }

    function handlePasswordInput(value) {
      if (!validatePassword(value)) {
        isPasswordValid.value = false;
        disableButton();
      } else {
        isPasswordValid.value = true;
      }
      employeeDto.password = value;
      validateForm();
    }

    function handlePhoneNumberInput(value) {
      employeeDto.phoneNumber = value;
      validateForm();
    }

    function handleEmailInput(value) {
      if (!validateEmail(value)) {
        isEmailValid.value = false;
        disableButton();
      } else {
        isEmailValid.value = true;
      }
      employeeDto.email = value;
      validateForm();
    }

    function goBack() {
      context.emit("go-back");
    }

    function validateForm() {
      let result = true;
      if (employeeDto.name === "") {
        result = false;
      }
      if (employeeDto.surname === "") {
        result = false;
      }
      if (employeeDto.login === "") {
        result = false;
      }
      if (!validatePassword(employeeDto.password) || !validatePassword(employeeDto.password)) {
        result = false;
      }
      if (employeeDto.phoneNumber === "") {
        result = false;
      }
      if (!validateEmail(employeeDto.email) || !validateEmail(employeeDto.email)) {
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

    function validatePassword(password) {
      if (password.length > 0 && password.charAt(0) !== " ") {
        const regex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        return regex.test(password);
      } else {
        return true;
      }
    }

    function validateEmail(email) {
      if (email.length > 0 && email.charAt(0) !== " ") {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
      } else {
        return true;
      }
    }

    return {
      employeeDto,
      handleSubmit,
      goBack,
      validateForm,
      isFormValid,
      isEmailValid,
      isPasswordValid,
      handleNameInput,
      handleSurnameInput,
      handleLoginInput,
      handlePasswordInput,
      handlePhoneNumberInput,
      handleEmailInput,
    };
  },
};
</script>

<style scoped>
@import "./forms-style.css";
</style>