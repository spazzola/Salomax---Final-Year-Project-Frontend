import { baseURL } from '../../../base-url.js';
import axios from "axios";

export default {
  unloadStudio(context) {
    context.commit('unloadStudio');
  },
  
  async addStudio(context, data) {
    try {
      const response = await axios.post(baseURL + "/studio/create", data);
      //context.commit('addStudio', data);
      return response;
    } catch (error) {
      //alert(error.response.data);
      return error;
    }
  },

  async setStudio(context, data) {
    context.commit('setStudio', data);
  }
};