<template>
  <nav-menu></nav-menu>
  <div>
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{ width: `${percent.toFixed(2)}%` }">
        <h2>{{ formNames[currentStep - 1] }}</h2>
      </div>
    </div>

    <div class="forms">
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
  </div>
  <the-footer></the-footer>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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
    const formNames = ["Studio's information", "Address's information", "User's information"]
    let percent = ref(33.33);
    let currentFormName = ref("Studio's information");

    const nextStep = () => {
      currentStep.value++;
    };

    const previousStep = () => {
      currentStep.value--;
    };

    function goBack() {
      currentStep.value--;
      updateProgress(-33.33);
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

    function updateProgress(value) {
      //percent.value = value;
      percent.value += value;
    }

    function handleStudioDtoInputs(data) {
      createStudioRequest.studioDto.name = data.name;
      createStudioRequest.studioDto.nip = data.nip;
      createStudioRequest.studioDto.regon = data.regon;
      createStudioRequest.studioDto.phoneNumber = data.phoneNumber;
      createStudioRequest.studioDto.email = data.email;

      nextStep();
      //updateProgress(66);
      updateProgress(33.33);
      currentFormName.value = "Address's information";
    }

    function handleAddressDtoInputs(data) {
      createStudioRequest.studioDto.addressDto.country = data.country;
      createStudioRequest.studioDto.addressDto.voivodeship = data.voivodeship;
      createStudioRequest.studioDto.addressDto.city = data.city;
      createStudioRequest.studioDto.addressDto.postalCode = data.postalCode;
      createStudioRequest.studioDto.addressDto.street = data.street;
      createStudioRequest.studioDto.addressDto.houseNumber = data.houseNumber;

      nextStep();
      //updateProgress(100);
      updateProgress(33.33)
      currentFormName.value = "User's information";
    }

    async function handleEmployeeDtoInputs(data) {
      createStudioRequest.employeeDto = data;
      //studioStore.dispatch('studio/addStudio', createStudioRequest);
      const response = await studioStore.dispatch(
        "studio/addStudio",
        createStudioRequest
      );
      if (response.status === 200) {
        //redirect to login page
        router.push("/login");
        alert("Studio has been created!");
      } else {
        alert(response.response.data);
      }
    }

    return {
      percent,
      currentStep,
      formNames,
      nextStep,
      previousStep,
      handleStudioDtoInputs,
      handleAddressDtoInputs,
      handleEmployeeDtoInputs,
      goBack,
    };
  },
};
</script>


<style scoped>
.progress-bar {
  width: 100%;
  height: 3rem;
  background-color: #ddd;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
}

.progress-bar-fill {
  height: 100%;
  background-color: #fc4a1a;
  border-radius: 5px;
  transition: width 0.25s ease-in-out;
  display: flex;
  justify-content: center;
}

h2 {
  color: #fffefe;
}

.forms {
  margin-top: 2rem;
}
</style>