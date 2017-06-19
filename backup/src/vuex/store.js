import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    activeRoute: 'movie',
    music: {
        activeList: null,
        activeListId: ''
    }
};

const mutations = {
    ROUTE_CHANGE(state, payload) {
        state.activeRoute = payload.activeRoute;
    },
    MUSIC_LISTS_CHANGE(state, payload) {
        state.music.activeList = payload.activeList;
        state.music.activeListId = payload.activeListId;
    }
};

export default new Vuex.Store({
    state,
    mutations
});