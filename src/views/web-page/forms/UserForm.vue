<template>
  <form>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="employeeDto.name" required />
    </div>
    <div class="form-group">
      <label for="surname">Surname</label>
      <input type="text" id="surname" v-model="employeeDto.surname" required />
    </div>
    <div class="form-group">
      <label for="login">Login</label>
      <input type="text" id="login" v-model="employeeDto.login" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="employeeDto.password"
        required
        class="form-control" aria-describedby="passwordHelpBlock"
      />
      <small id="passwordHelpBlock" class="form-text text-muted">
        Your password must be at least 6 characters long, contain letters, numbers and special characters,
        and must not contain spaces or emoji.
      </small>
    </div>
    <div class="form-group">
      <label for="phoneNumber">Phone Number</label>
      <input
        type="tel"
        id="phoneNumber"
        v-model="employeeDto.phoneNumber"
        required
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="employeeDto.email" required />
    </div>
    <button @click.prevent="goBack">Previous</button>
    <button @click.prevent="handleSubmit" type="submit">Create</button>
  </form>
</template>

<script>
import { reactive } from "vue";

export default {
  setup(props, context) {
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

    return { employeeDto, handleSubmit, goBack };
  },
};
</script>

<style scoped>
</style>