import { baseURL } from '../../../base-url.js';
import axios from "axios";

export default {
  async loadWorks(context, id) {
    const response = await axios.get(baseURL + "/work/getWorks", {
      params: {
        studioId: id
      }
    });

    let works = response.data
    context.commit('setWorks', works);
  },

  async addWork(context, data) {
    try {
      const response = await axios.post(baseURL + "/work/create", data);
      return response;
    } catch (error) {
      return error.response.data;
    }
  },

  async editWork(context, data) {
    try {
      const response = await axios.put(baseURL + "/work/update", data);
      return response;
    } catch (error) {
      return error.response.data;
    }
  },

  async deleteWork(context, params) {
    try {
      const response = await axios.delete(baseURL + "/work/delete", { params });
      return response
    } catch (error) {
      return error.response.dsta;
    }
  },

  async setWork(context, data) {
    context.commit('setWork', data);
  }

}