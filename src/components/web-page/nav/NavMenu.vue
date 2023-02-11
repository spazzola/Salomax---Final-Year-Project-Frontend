<template>
    <header class="navbar">
		<h1 class="logo">Log homes</h1>
		<nav-bar/>
	</header>
</template>

<script>
import NavBar from "./NavBar.vue"

export default {
    name: 'NavMenu',
    components: {
        NavBar
    }
}
</script>

<style scoped>
header {
    background-color: #4ABDAC;
    color: #FFFEFE;
}

h1 {
    font-weight: bold;
}

.navbar {
	display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    /*background-color: #9B7653; /* brown color */ 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
