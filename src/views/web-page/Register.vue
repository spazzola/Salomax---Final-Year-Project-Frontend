<template>
  <nav-menu />
  <div>
    <form @submit.prevent="submitForm">
      <h3>Studio Information</h3>
      <div class="form-group">
        <label for="studioName">Name</label>
        <input type="text" id="studioName" v-model="studioDto.name" required />
      </div>
      <div class="form-group">
        <label for="nip">NIP</label>
        <input type="text" id="nip" v-model="studioDto.nip" required />
      </div>
      <div class="form-group">
        <label for="regon">REGON</label>
        <input type="text" id="regon" v-model="studioDto.regon" required />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumberId"
          v-model="studioDto.phoneNumber"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="emailId" v-model="studioDto.email" required />
      </div>

      <h3>Address</h3>
      <div class="form-group">
        <label for="country">Country</label>
        <input
          type="text"
          id="country"
          v-model="studioDto.addressDto.country"
          required
        />
      </div>
      <div class="form-group">
        <label for="voivodeship">Voivodeship</label>
        <input
          type="text"
          id="voivodeship"
          v-model="studioDto.addressDto.voivodeship"
          required
        />
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input
          type="text"
          id="city"
          v-model="studioDto.addressDto.city"
          required
        />
      </div>
      <div class="form-group">
        <label for="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          v-model="studioDto.addressDto.postalCode"
          required
        />
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input
          type="text"
          id="street"
          v-model="studioDto.addressDto.street"
          required
        />
      </div>
      <div class="form-group">
        <label for="houseNumber">House Number</label>
        <input
          type="text"
          id="houseNumber"
          v-model="studioDto.addressDto.houseNumber"
          required
        />
      </div>

      <h3>Employee Information</h3>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="employeeDto.name" required />
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input
          type="text"
          id="surname"
          v-model="employeeDto.surname"
          required
        />
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
        />
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

      <div class="form-group">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
  <the-footer />
</template>

<script>
import NavMenu from "@/components/web-page/nav/NavMenu.vue";
import TheFooter from "@/components/web-page/footer/TheFooter.vue";
import { reactive } from "vue";
import axios from "axios";

export default {
  name: "Register",
  components: {
    NavMenu,
    TheFooter,
  },
  setup() {
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

    const employeeDto = reactive({
      name: "",
      surname: "",
      login: "",
      password: "",
      phoneNumber: "",
      email: "",
    });

    const submitForm = async () => {
      const formData = {
        studioDto,
        employeeDto
      };

      try {
        await axios.post("http://localhost:8080/studio/create", formData);

        // Reset form data
        // StudioDto.value.nip = "";
        // StudioDto.value.regon = "";
        // StudioDto.value.phoneNumber = "";
        // StudioDto.value.email = "";

        // StudioDto.value.AddressDto.value.country = "";
        // StudioDto.value.AddressDto.value.voivodeship = "";
        // StudioDto.value.AddressDto.value.city = "";
        // StudioDto.value.AddressDto.value.postalCode = "";
        // StudioDto.value.AddressDto.value.street = "";
        // StudioDto.value.AddressDto.value.houseNumber = "";

        // EmployeeDto.value.name = "";
        // EmployeeDto.value.surname = "";
        // EmployeeDto.value.login = "";
        // EmployeeDto.value.password = "";
        // EmployeeDto.value.phoneNumber = "";
        // EmployeeDto.value.email = "";
      } catch (error) {
        console.error(error.response.data);
      }
    };

    return {
      studioDto,
      employeeDto,
      submitForm,
    };
  },
};
</script>


<style scoped>
</style>