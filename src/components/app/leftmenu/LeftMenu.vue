<template>
  <div class="left-menu">
    <ul>
      <li class="active">
        <font-awesome-icon icon="fa-regular fa-calendar-check" />
        Appointments
      </li>
      <li>
        <font-awesome-icon icon="fa-regular fa-address-card" />
        Clients
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'fa-scissors']" />
        Services
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'fa-users']" />
        Employees
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'fa-coins']" />
        Costs</li>
      <li>
        <font-awesome-icon :icon="['far', 'fa-circle-question']" />
        Help</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  setup() {},
};
</script>

<style scoped>
.left-menu {
  text-align: left;
  background-color: #4abdac;
  height: 100%;
  border-top-right-radius: 15px;
}

ul {
  list-style-type: none;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fffefe;
}

li {
  /* margin-top: 1rem; */
  transition: color 0.2s ease-in-out;
  padding: 0.5rem;
}

.active {
  border-right: 0.3rem solid #fc4a1a;
  border-top-right-radius: 15px;
  color: #fc4a1a;
}

li:hover {
  color: #fc4a1a;
  cursor: pointer;
  border-right: 0.3rem solid #fc4a1a;
  margin-left: 0.3rem;
  font-size: 1.4rem;
}

</style>