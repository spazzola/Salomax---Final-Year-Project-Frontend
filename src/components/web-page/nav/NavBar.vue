<template>
  <nav class="navbar">
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
.nav-link {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Libre Baskerville', sans-serif;
    padding: 2rem;
    text-decoration: none;
    display: inline;
}

a:hover {
  background-color: #FC4A1A;
  border-radius: 5%;
}

.active {
  background-color: #FC4A1A;
  border-radius: 5%;
}
</style>