import { axiosInstance } from "../services/backend"

export default {
    namespaced: true,
    state: {
        donors: []
    },
    actions: {
        get({ commit }, { lat, lon }) {
            axiosInstance
                .get("/donors", {
                    params: { lat: lat, lon: lon },
                })
                .then((res) => (commit('load', res.data)))
        }
    },
    mutations: {
        load(state, payload) {
            state.donors = payload
        }
    },
    getters: {
        allDonor: (state) => state.donors,
        nearbyDonors: state => state.donors.filter(donor => donor.distance && donor.distance < 10)
    }
}