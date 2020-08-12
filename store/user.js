export const state = () => ({
  user: null,
  token: (process.browser && localStorage.getItem('token')) || null,
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  UNSET_USER(state) {
    state.user = null;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  UNSET_TOKEN(state) {
    state.token = null;
  },
};

export const actions = {
  async authorize({ commit }) {
    try {
      const user = await this.$axios.$get('/users/me');
      console.log(user);
      commit('SET_USER', user);
    } catch {}
  },
  async login({ commit }, payload) {
    try {
      const { data } = await this.$axios.post('/auth/login', payload);
      console.log(data);
      const { token, ...user } = data;
      commit('SET_USER', user);
      commit('SET_TOKEN', token);
      localStorage.setItem('token', token);
    } catch (e) {
      console.log(e.response.data);
    }
  },
  logout({ commit }) {
    commit('UNSET_TOKEN');
    commit('UNSET_USER');
  },
};
