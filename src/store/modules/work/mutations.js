export default {
  setWorks(state, payload) {
      state.works = payload;
  },
  setWork(state, payload) {
      state.work = payload;
  },
  addWork(state, payload) {
      state.works.push(payload)
  },
  updateWork(state, payload) {
      state.works.push(payload)
  }
}