export default {
  setEmployees(state, payload) {
      state.employees = payload;
  },
  setEmployee(state, payload) {
      state.employee = payload;
  },
  addEmployee(state, payload) {
      state.employees.push(payload)
  },
  updateEmployee(state, payload) {
      state.employees.push(payload)
  }
}