import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    reportId: null,
    reportType: null,
    userInfo: ''
  },
  mutations: {
    SET_ReportId (state, rid) {
      state.reportId = rid;
    },
    SET_ReportType (state, type) {
      state.reportType = type;
    },
    SET_USERINFO (state, user) {
      state.userInfo = user
    }
  }
});

export default store
