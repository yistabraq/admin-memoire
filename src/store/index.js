import Vue from "vue";
import Vuex from "vuex";
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
//import users from "./users";
//import launch from "./lanch";
const state = {
  count: false,
}
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
