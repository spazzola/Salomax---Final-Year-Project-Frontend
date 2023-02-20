export default {
  setAppointments(state, payload) {
      state.appointments = payload;
  },
  setAppointment(state, payload) {
      state.appointment = payload;
  },
  addAppointment(state, payload) {
      state.appointments.push(payload)
  },
  updateAppointment(state, payload) {
      state.appointments.push(payload)
  }
}