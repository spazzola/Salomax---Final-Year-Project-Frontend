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
}