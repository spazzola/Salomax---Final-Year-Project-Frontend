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

  async loadMonthAppointments(context, params) {
    const response = await axios.get(baseURL + "/appointment/getMonthAppointments", {
      params: {
        month: params.month,
        year: params.year,
        employeeId: params.employeeId,
        studioId: params.studioId
      }
    });
    let appointments = response.data
    context.commit('setAppointments', appointments);
  },

}