<template>
  <base-grow-spinner :loading="loading" />

  <nav-menu />

  <div v-if="isMobile || isTablet">
    <h1>Hello!</h1>
    <div class="message-content">
      Thank you for your interest in our appointment management software.
      <br />
      I would like to inform you that our software is not currently available
      for mobile and tablet devices, but we are currently working on a mobile
      version that will be released soon. We apologize for any inconvenience
      this may cause and appreciate your patience.
      <br />
      Thank you!
    </div>
  </div>

  <form v-else>
    <my-text-input
      placeholder="Login"
      @text-input-finished="handleLoginInput"
    />
    <my-text-input
      placeholder="Password"
      type="password"
      @text-input-finished="handlePasswordInput"
    />

    <!-- <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">@</div>
    </div>
    <my-text-input
      placeholder="Password"
      type="password"
      @text-input-finished="handlePasswordInput"
    />
  </div> -->
    <base-button @clicked="handleSubmit" text="Log in" />
  </form>

  <the-footer />
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NavMenu from "@/components/web-page/nav/NavMenu.vue";
import TheFooter from "@/components/web-page/footer/TheFooter.vue";
import MyTextInput from "../../components/common/inputs/MyTextInput.vue";
import BaseGrowSpinner from "../../components/common/loading/BaseGrowSpinner.vue";
import BaseButton from "../../components/common/buttons/BaseButton.vue";
import { isMobile, isTablet } from "mobile-device-detect";

export default {
  name: "LogIn",
  components: {
    NavMenu,
    TheFooter,
    MyTextInput,
    BaseGrowSpinner,
    BaseButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);

    const authRequest = reactive({
      login: "",
      password: "",
      userType: "EMPLOYEE",
    });

    function handleLoginInput(value) {
      authRequest.login = value;
    }

    function handlePasswordInput(value) {
      authRequest.password = value;
    }

    async function handleSubmit() {
      loading.value = true;
      let response = await store.dispatch("login", authRequest);
      loading.value = false;
      if (response.status === 200) {
        router.push("/appointments");
      } else {
        alert(response);
      }
    }

    return {
      handleLoginInput,
      handlePasswordInput,
      handleSubmit,
      loading,
      isMobile,
      isTablet,
    };
  },
};
</script>

<style scoped>
form {
  margin-top: 15rem;
}

h1 {
  margin-top: 1rem;
}

.message-content {
  padding: 1rem;
  overflow: auto;
}

@media screen and (min-width: 700px) {
  .message-content {
    max-width: 45rem;
    margin-inline: auto;
  }

  h1 {
    margin-top: 5rem;
  }
}
</style>