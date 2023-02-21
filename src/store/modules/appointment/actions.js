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

  async editAppointment(context, data) {
    try {
      const response = await axios.put(baseURL + "/appointment/update", data);
      return response;
    } catch (error) {
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

  async finishAppointment(context, id) {
    console.log(id);
    const response = await axios.put(baseURL + "/appointment/finishAppointment", null, {
      params: {
        id
      }
    });

    return response;
  },

  async deleteAppointment(context, id) {
    console.log(id);
    const response = await axios.delete(baseURL + "/appointment/delete", {
      params: {
        id
      }
    });

    return response;
  }
  
}