import { axiosInstance } from "../services/backend";

export default {
    namespaced: true,
    state: {
        access: localStorage.getItem('access') || null,
        refresh: localStorage.getItem('refresh') || null,
        username: '',
        authenticated: false,
    },
    actions: {
        login({ commit, dispatch }, { username, password }) {
            return axiosInstance
                .post("/token/", { username: username, password: password })
                .then((res) => {
                    const { access, refresh } = res.data;
                    console.log('tocommmit');
                    commit('loadTokens', { access, refresh })
                })
                .then(() => dispatch('user/validate', null, { root: true })).catch(err => console.log(err))
            // .then(() => {
            //     const { access, refresh } = this.state;
            //     localStorage.setItem("auth", JSON.stringify({ access, refresh }));
            // })
            // .catch((err) => ;
        },

        validate({ state, commit, dispatch }) {
            state.access &&
                axiosInstance
                    .get("user/", {
                        headers: { Authorization: `Bearer ${state.access}` },
                    })
                    .then((res) =>
                        commit('loadUser', { username: res.data.username })
                    ).then(() => axiosInstance.defaults.headers['Authorization'] = `Bearer ${state.access}`).catch(() => dispatch('user/logout', null, { root: true }))
        },
        logout({ commit }) {
            commit('clear')
        }

        // .then(
        //     () =>
        //     (axiosInstace.defaults.headers.common[
        //         "Authorization"
        //     ] = `Bearer ${this.state.access}`)
        // )


    },
    mutations: {
        loadTokens(state, payload) {
            console.log('here');
            state.access = payload.access
            state.refresh = payload.refresh
            localStorage.setItem('access', state.access)
            localStorage.setItem('refresh', state.refresh)
        },
        loadUser(state, payload) {
            state.username = payload.username
            state.authenticated = true
        },
        clear(state) {
            state.username = ''
            state.access = ''
            state.refresh = ''
            state.authenticated = false
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            axiosInstance.defaults.headers['Authorization'] = ''
        }
    },
    getters: {
        getAccessToken: state => state.access,
        getRefreshToken: state => state.refresh,
        getUsername: state => state.username,
        userIsAuthenticated: state => state.authenticated
    }
}