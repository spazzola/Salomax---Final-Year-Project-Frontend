<template>
  <div class="left-menu">
    <ul>
      <router-link class="nav-link" active-class="active" to="/appointments">
        <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
          <font-awesome-icon icon="fa-regular fa-calendar-check" />
          <p>Appointments</p>
        </li>
      </router-link>

      <router-link :class="{ 'nav-link': true, 'active': isActiveRoute }" to="/clients">
        <li>
          <font-awesome-icon icon="fa-regular fa-address-card" />
          <p>Clients</p>
        </li>
      </router-link>

      <router-link class="nav-link" active-class="active" to="/services">
        <li>
          <font-awesome-icon :icon="['fas', 'fa-scissors']" />
          <p>Services</p>
        </li>
      </router-link>

      <router-link class="nav-link" active-class="active" to="/employees">
        <li>
          <font-awesome-icon :icon="['fas', 'fa-users']" />
          <p>Employees</p>
        </li>
      </router-link>

      <router-link class="nav-link" active-class="active" to="/costs">
        <li>
          <font-awesome-icon :icon="['fas', 'fa-coins']" />
          <p>Costs</p>
        </li>
      </router-link>

      <router-link class="nav-link" active-class="active" to="/help">
        <li>
          <font-awesome-icon :icon="['far', 'fa-circle-question']" />
          <p>Help</p>
        </li>
      </router-link>
      <router-link class="nav-link" active-class="active" to="/login">
        <li>
          <font-awesome-icon :icon="['fas', 'fa-arrow-right-from-bracket']" />
          <p>Logout</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  name: "LeftMenu",
  setup() {
    const route = useRoute();
    const activeBorderRadius = ref("15px");
    const hoveredBorderRadius = ref("0px");
    let isFirstElemenetHovered = ref(false);

    const isAppointmentsRoute = computed(() => {
      return route.path === "/appointments";
    });

    const handleMouseEnter = () => {
      isFirstElemenetHovered.value = true;
    };

    const handleMouseLeave = () => {
      isFirstElemenetHovered.value = false;
    };

    activeBorderRadius.value = isAppointmentsRoute.value ? "15px" : "0px";

    function applyHoveredBorderRadius() {
      if (!isAppointmentsRoute.value && isFirstElemenetHovered.value) {
        hoveredBorderRadius.value = '15px';
      } else {
        hoveredBorderRadius.value = '0px';
      }
    }

    const borderHover = computed(() => {
      applyHoveredBorderRadius();

      if (isAppointmentsRoute.value && isFirstElemenetHovered.value) {
        return '';
      } else {
        return '0.3rem solid #fc4a1a';
      }
    })

    const isActiveRoute = computed(() => {
      return route.path.startsWith('/clients');
    });

    return { activeBorderRadius, borderHover, hoveredBorderRadius, handleMouseEnter, handleMouseLeave, isActiveRoute };
  },
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
  font-size: 1.4em;
  font-weight: bold;
  color: #fffefe;
}

li {
  /* margin-top: 1rem; */
  transition: color 0.2s ease-in-out;
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  margin: 0;
  flex: 50%;
}

.active {
  border-right: 0.3rem solid #fc4a1a;
  border-top-right-radius: v-bind(activeBorderRadius);
  color: #fc4a1a;
}

li:hover {
  color: #fc4a1a;
  cursor: pointer;
  border-right: v-bind(borderHover);
  border-top-right-radius: v-bind(hoveredBorderRadius);
  margin-left: 0.3rem;
  font-size: 1.5rem;
}
</style>