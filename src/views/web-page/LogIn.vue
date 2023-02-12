<template>
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
    <button @click.prevent="handleSubmit" class="btn btn-primary">
      Log in
    </button>
  </form>
  <the-footer />
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NavMenu from "@/components/web-page/nav/NavMenu.vue";
import TheFooter from "@/components/web-page/footer/TheFooter.vue";
import MyTextInput from "../../components/common/inputs/MyTextInput.vue";

export default {
  name: "LogIn",
  components: {
    NavMenu,
    TheFooter,
    MyTextInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

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
      let response = await store.dispatch("login", authRequest);
      if (response.status === 200) {
        router.push("/register");
      } else {
        alert(response);
      }
    }

    return { handleLoginInput, handlePasswordInput, handleSubmit };
  },
};
</script>

<style scoped>
form {
  margin-top: 15rem;
}
</style>