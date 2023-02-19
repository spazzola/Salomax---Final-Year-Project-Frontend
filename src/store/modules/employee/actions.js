import { baseURL } from '../../../base-url.js';
import axios from "axios";

export default {
    async loadEmployees(context, id) {
      const response = await axios.get(baseURL + "/employee/getEmployees", {
        params: {
          studioId: id
        }
      });

      let employees = response.data
      context.commit('setEmployees', employees);
    },
}