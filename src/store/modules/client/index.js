import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {
            clients: [],
            client: null
        };
    },
    mutations,
    getters,
    actions,
};