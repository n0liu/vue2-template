export default {
  namespaced: true,
  state: {
    departmentId: null
  },
  mutations: {
    SET_DEPT_ID (state, payload) {
      state.departmentId = payload
    }
  }
}
