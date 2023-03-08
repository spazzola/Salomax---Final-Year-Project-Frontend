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
}