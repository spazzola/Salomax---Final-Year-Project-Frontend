import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/web-page/Home.vue'
import Pricing from '../views/web-page/Pricing.vue'
import Features from '../views/web-page/Features.vue'
import LogIn from '../views/web-page/LogIn.vue'
import Register from '../views/web-page/Register.vue'
import Appointments from '../views/app/appointment/Appointments.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
