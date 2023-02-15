<template>
  <base-grow-spinner :loading="loading" />

  <nav-menu />

  <form>
    <my-text-input
      placeholder="Login"
      @text-input-finished="handleLoginInput"
    />
    <my-text-input
      placeholder="Password"
      type="password"
      @text-input-finished="handlePasswordInput"
    />
    <!-- <button @click.prevent="handleSubmit" class="btn btn-primary">
      Log in
    </button> -->
    <base-button @clicked="handleSubmit" text="Log in"/>
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

    return { handleLoginInput, handlePasswordInput, handleSubmit, loading };
  },
};
</script>

<style scoped>
form {
  margin-top: 15rem;
}
</style>