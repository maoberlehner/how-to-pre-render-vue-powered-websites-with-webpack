import { GET_LANDING_PAGE } from '../action-types';
import { SET_LANDING_PAGE } from '../mutation-types';
import landingPageModel, { LandingPage } from '../../models/landing-page';

export default {
  namespaced: true,
  actions: {
    async [GET_LANDING_PAGE]({ commit }, id) {
      commit(SET_LANDING_PAGE, await landingPageModel.get(id));
    },
  },
  mutations: {
    [SET_LANDING_PAGE](state, landingPage) {
      Object.assign(state, landingPage);
    },
  },
  // We initialize the state with
  // an empty LandingPage object.
  state: () => new LandingPage(),
};
