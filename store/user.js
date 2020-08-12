export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  UNSET_USER(state) {
    state.user = null;
  },
};

export const actions = {
  async authorize({ commit }) {
    try {
      const user = await this.$axios.$get('/users/me');
      commit('SET_USER', user);
    } catch {}
  },
  logout({ commit }) {
    commit('UNSET_USER');
    localStorage.removeItem('token');
  },
};
