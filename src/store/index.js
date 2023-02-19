import { createStore } from 'vuex'
import axios from "axios";
import { baseURL } from '../base-url.js';

import studioModule from './modules/studio/index.js';
import clientModule from './modules/client/index.js';
import workModule from './modules/work/index.js';
import employeeModule from './modules/employee/index.js';
import appointmentModule from './modules/appointment/index.js';

export default createStore({
  state: {
    jwt: null,
    login: null,
    role: null,
    name: null,
    surname: null
  },
  mutations: {
    setUser(state, payload) {
      state.jwt = payload.jwt;
      state.login = payload.login;
      state.role = payload.role;
      state.name = payload.name;
      state.surname = payload.surname;
    }
  },
  actions: {
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload
      });
    },
    async auth(context, payload) {
      try {
        const response = await axios.post(baseURL + "/user/authenticate", payload)
        const responseData = response.data;

        const expiresIn = +responseData.expiresIn * 1000;
        // const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('jwt', responseData.jwt);
        localStorage.setItem('login', responseData.login);
        localStorage.setItem('role', responseData.role);
        localStorage.setItem('name', responseData.name);
        localStorage.setItem('surname', responseData.surname)
        localStorage.setItem('tokenExpiration', expirationDate);

        context.commit('setUser', {
          jwt: responseData.jwt,
          login: responseData.login,
          role: responseData.role,
          name: responseData.name,
          surname: responseData.surname
        });
        
        return response;
      } catch (error) {
        return error.response.data;
      }
    }
  },
  modules: {
    studio: studioModule,
    client: clientModule,
    work: workModule,
    employee: employeeModule,
    appointment: appointmentModule
  }
})
