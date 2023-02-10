<template>
  <form>
    <div class="form-group">
      <label for="studioName">Name</label>
      <input type="text" id="studioName" name="studioName" v-model="studioDto.name" required />
    </div>
    <div class="form-group">
      <label for="nip">NIP</label>
      <input type="text" id="nip" name="studioNIP" v-model="studioDto.nip" required />
    </div>
    <div class="form-group">
      <label for="regon">REGON</label>
      <input type="text" id="regon" name="studioREGON" v-model="studioDto.regon" required />
    </div>
    <div class="form-group">
      <label for="phoneNumber">Phone Number</label>
      <input
        type="tel"
        id="phoneNumberId"
        name="studioPhoneNumber" 
        v-model="studioDto.phoneNumber"
        required
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="emailId" name="studioEmail" v-model="studioDto.email" required />
    </div>
    <button @click.prevent="handleSubmit">Next</button>
  </form>
</template>

<script>
import { reactive } from "vue";

export default {
  setup(props, context) {
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
      //context.emit("submit", studioDto);
      context.emit("studioDto-data", studioDto);
    }

    return { studioDto, handleSubmit };
  },
};
</script>

<style scoped>
</style>