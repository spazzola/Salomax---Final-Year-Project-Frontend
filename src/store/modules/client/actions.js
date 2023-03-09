import { baseURL } from '../../../base-url.js';
import axios from "axios";

export default {
    async loadClients(context, studioId) {
      const response = await axios.get(baseURL + "/client/getClients", {
        params: {
          studioId
        }
      });

      let clients = response.data
      context.commit('setClients', clients);
    },

    async addClient(context, data) {
      try {
        const response = await axios.post(baseURL + "/client/create", data);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },

    async editClient(context, data) {
      try {
        const response = await axios.put(baseURL + "/client/update", data);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },

    async deleteClient(context, params) {
      try {
        const response = await axios.delete(baseURL + "/client/deleteAssignedClient", { params });
        return response
      } catch (error) {
        return error.response.dsta;
      }
    },

    async setClient(context, data) {
      context.commit('setClient', data);
  }
}