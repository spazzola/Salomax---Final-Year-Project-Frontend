<template>
  <nav-menu></nav-menu>
  <div>
    <div class="progress-bar">
      <div
        v-for="(step, index) in 3"
        :key="index"
        :class="{ active: index + 1 === currentStep }"
      />
    </div>
    <div v-show="currentStep === 1">
      <Studio-form @studioDto-data="handleStudioDtoInputs" />
    </div>
    <div v-show="currentStep === 2">
      <Address-form
        @addressDto-data="handleAddressDtoInputs"
        @go-back="goBack"
      />
    </div>
    <div v-show="currentStep === 3">
      <User-form @submit="handleEmployeeDtoInputs" @go-back="goBack" />
    </div>
  </div>
  <the-footer></the-footer>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router"
import NavMenu from "@/components/web-page/nav/NavMenu.vue";
import TheFooter from "@/components/web-page/footer/TheFooter.vue";
//import axios from "axios";
import StudioForm from "./forms/StudioForm.vue";
import AddressForm from "./forms/AddressForm.vue";
import UserForm from "./forms/UserForm.vue";

export default {
  name: "Register",
  components: {
    NavMenu,
    TheFooter,
    StudioForm,
    AddressForm,
    UserForm,
  },
  setup() {
    const studioStore = useStore();
    const router = useRouter();
    const currentStep = ref(1);

    const nextStep = () => {
      currentStep.value++;
    };

    const previousStep = () => {
      currentStep.value--;
    };

    function goBack() {
      currentStep.value--;
    }

    const createStudioRequest = reactive({
      studioDto: {
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
      },
      employeeDto: {},
    });

    function handleStudioDtoInputs(data) {
      createStudioRequest.studioDto.name = data.name;
      createStudioRequest.studioDto.nip = data.nip;
      createStudioRequest.studioDto.regon = data.regon;
      createStudioRequest.studioDto.phoneNumber = data.phoneNumber;
      createStudioRequest.studioDto.email = data.email;

      nextStep();
    }

    function handleAddressDtoInputs(data) {
      createStudioRequest.studioDto.addressDto.country = data.country;
      createStudioRequest.studioDto.addressDto.voivodeship = data.voivodeship;
      createStudioRequest.studioDto.addressDto.city = data.city;
      createStudioRequest.studioDto.addressDto.postalCode = data.postalCode;
      createStudioRequest.studioDto.addressDto.street = data.street;
      createStudioRequest.studioDto.addressDto.houseNumber = data.houseNumber;

      nextStep();
    }

    async function handleEmployeeDtoInputs(data) {
      createStudioRequest.employeeDto = data;
      //studioStore.dispatch('studio/addStudio', createStudioRequest);
      const response = await studioStore.dispatch('studio/addStudio', createStudioRequest);
      if (response.status === 200) {
        //redirect to login page
        router.push("/login");
        alert("Studio has been created!");
      } else {
        alert(response.response.data);
      }
    }

    // async function sendRequest(data) {
      // try {
      //   const response = await axios.post("http://localhost:8080/studio/create", data);
      //   //console.log(response.status);
      //   return response.data;
      // } catch (error) {
      //   console.error(error.response.data);
      // }
    // }
    return {
      currentStep,
      nextStep,
      previousStep,
      handleStudioDtoInputs,
      handleAddressDtoInputs,
      handleEmployeeDtoInputs,
      goBack
    };
  },
};
</script>


<style scoped>
.progress-bar {
  display: flex;
}

.progress-bar div {
  width: 33.33%;
  height: 10px;
  background: lightgray;
  border-radius: 10px;
  margin-right: 10px;
}

.progress-bar div.active {
  background: blue;
}
</style>