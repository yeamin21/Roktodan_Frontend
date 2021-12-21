import Vue from 'vue'
import Vuex from 'vuex'
import DonorStore from './DonorStore'
import RequestStore from './RequestStore'
import UserStore from './UserStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    'user': UserStore, 'donors': DonorStore, requests: RequestStore
  }
})
