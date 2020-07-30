import moment from 'moment';

export const state = () => ({
  pastes: [],
});

export const mutations = {
  SET_PASTES(state, pastes) {
    state.pastes = pastes;
  },
};

export const actions = {
  async fetchPastes({ commit }) {
    const pastes = await this.$axios.$get('/paste/');
    commit(
      'SET_PASTES',
      pastes.map((paste) => ({
        ...paste,
        timeAgo: moment(paste.date).locale('ru-ru').fromNow(),
      }))
    );
  },
};
