import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/web-page/Home.vue'
import Pricing from '../views/web-page/Pricing.vue'
import Features from '../views/web-page/Features.vue'
import LogIn from '../views/web-page/LogIn.vue'
import Register from '../views/web-page/Register.vue'
import Appointments from '../views/app/appointment/Appointments.vue'
import Clients from '../views/app/clients/Clients.vue';
import ClientDetails from '../views/app/clients/ClientDetails.vue'
import ClientEdit from '../views/app/clients/ClientEdit.vue';
import Services from '../views/app/services/Services.vue';
import ServiceDetails from '../views/app/services/ServiceDetails.vue';
import Employees from '../views/app/employees/Employees.vue';
import Costs from '../views/app/costs/Costs.vue';
import Help from '../views/app/help/Help.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/features',
    name: 'Features',
    component: Features
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  {
    path: '/clients/details/:id',
    name: 'ClientDetails',
    component: ClientDetails,
    props: true
  },
  {
    path: '/clients/edit/:id',
    name: 'ClientEdit',
    component: ClientEdit,
    props: true
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/services/details/:id',
    name: 'ServiceDetails',
    component: ServiceDetails,
    props: true
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/costs',
    name: 'Costs',
    component: Costs
  },
  {
    path: '/Help',
    name: 'Help',
    component: Help
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
