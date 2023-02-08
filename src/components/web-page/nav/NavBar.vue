<template>
  <nav>
    <router-link class="nav-link" active-class="active" to="/">Home</router-link>
    <router-link class="nav-link" active-class="active" to="/pricing">Pricing</router-link>
    <router-link class="nav-link" active-class="active" to="/features">Features</router-link>
    <router-link class="nav-link" active-class="active" to="/login">Log in</router-link>
    <router-link class="nav-link" active-class="active" to="/register">Register</router-link>
  </nav>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
nav {
    max-width: 100%;
    margin-top: 4rem;
}

.navbar {
  padding: 0;

}

.nav-link {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Libre Baskerville', sans-serif;
    margin: 2rem;
    text-decoration: none;
}
</style>