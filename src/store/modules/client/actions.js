import { baseURL } from '../../../base-url.js';
import axios from "axios";

export default {
    async loadClients(context, id) {
      const response = await axios.get(baseURL + "/client/getClients", {
        params: {
          studioId: id
        }
      });

      let clients = response.data
      context.commit('setClients', clients);
    },
}