<template>
  <form>
    <div class="form-group">
      <input
        type="text"
        id="name"
        v-model="employeeDto.name"
        @input="validateForm"
        placeholder="Name"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="surname"
        v-model="employeeDto.surname"
        @input="validateForm"
        placeholder="Surname"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="login"
        v-model="employeeDto.login"
        @input="validateForm"
        placeholder="Login"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        id="password"
        v-model="employeeDto.password"
        @input="validateForm"
        placeholder="Password"
        class="form-control"
        aria-describedby="passwordHelpBlock"
        required
      />
      <small id="passwordHelpBlock" class="form-text text-muted">
        Your password must be at least 6 characters long, contain letters,
        numbers and special characters, <br />
        and must not contain spaces.
      </small>
    </div>
    <div class="form-group">
      <input
        type="tel"
        id="phoneNumber"
        v-model="employeeDto.phoneNumber"
        @input="validateForm"
        placeholder="Phone number"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <input
        type="email"
        id="email"
        v-model="employeeDto.email"
        @input="validateForm"
        placeholder="Email"
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
      Create
    </button>
  </form>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup(props, context) {
    const isFormValid = ref(false);

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
      if (!validatePassword(employeeDto.password)) {
        result = false;
      }
      if (employeeDto.phoneNumber === "") {
        result = false;
      }
      if (!validateEmail(employeeDto.email)) {
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
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
      return regex.test(password);
    }

    function validateEmail(value) {
      const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value);
    }

    return { employeeDto, handleSubmit, goBack, validateForm, isFormValid };
  },
};
</script>

<style scoped>
@import "./forms-style.css";
</style>