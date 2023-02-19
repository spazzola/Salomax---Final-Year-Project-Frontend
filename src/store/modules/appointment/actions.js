import { baseURL } from '../../../base-url.js';
import axios from "axios";

export default {
  async addAppointment(context, data) {
    try {
      const response = await axios.post(baseURL + "/appointment/create", data);
      //context.commit('addStudio', data);
      return response;
    } catch (error) {
      //alert(error.response.data);
      return error;
    }
  },

  async setAppointment(context, data) {
    context.commit('setAppointment', data);
  }
}