import { axiosInstance } from "../services/backend"

export default {
    namespaced: true,
    state: {
        requests: []
    },
    actions: {
        get({ commit }) {
            axiosInstance
                .get("/requests",)
                .then((res) => (commit('load', res.data)))
        },
        filter({ commit }, payload) {
            axiosInstance
                .get("/requests", { params: payload })
                .then((res) => (commit('load', res.data)))

        }

    },
    mutations: {
        load(state, payload) {
            state.requests = payload
        }
    },
    getters: {
        allRequest: (state) => state.requests,
        //nearbyDonors: state => state.donors.filter(donor => donor.distance && donor.distance < 10)
    }
}