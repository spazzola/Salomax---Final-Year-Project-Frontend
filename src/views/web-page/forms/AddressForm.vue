<template>
  <form>
    <div class="form-group">
      <label for="country">Country</label>
      <input type="text" id="country" name="addressCountry" v-model="addressDto.country" required />
    </div>
    <div class="form-group">
      <label for="voivodeship">Voivodeship</label>
      <input
        type="text"
        id="voivodeship"
        name="voivodeship" 
        v-model="addressDto.voivodeship"
        required
      />
    </div>
    <div class="form-group">
      <label for="city">City</label>
      <input type="text" id="city" name="addressCity" v-model="addressDto.city" required />
    </div>
    <div class="form-group">
      <label for="postalCode">Postal Code</label>
      <input
        type="text"
        id="postalCode"
        name="addressPostalCode" 
        v-model="addressDto.postalCode"
        required
      />
    </div>
    <div class="form-group">
      <label for="street">Street</label>
      <input type="text" id="street" name="addressStreet" v-model="addressDto.street" required />
    </div>
    <div class="form-group">
      <label for="houseNumber">House Number</label>
      <input
        type="text"
        id="houseNumber"
        name="addressHouseNumber" 
        v-model="addressDto.houseNumber"
        required
      />
    </div>
    <button @click.prevent="goBack">Previous</button>
    <button @click.prevent="handleSubmit" type="submit">Next</button>
  </form>
</template>

<script>
import { reactive } from "vue";

export default {
  setup(props, context) {
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
    return { addressDto, handleSubmit, goBack };
  },
};
</script>

<style scoped>
</style>