export default {
  setClients(state, payload) {
      state.clients = payload;
  },
  setClient(state, payload) {
      state.client = payload;
  },
  addClient(state, payload) {
      state.clients.push(payload)
  },
  updateClient(state, payload) {
      state.clients.push(payload)
  }
}