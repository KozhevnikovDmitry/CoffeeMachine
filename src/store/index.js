import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import { defaultState } from "./defaultState" 

Vue.use(Vuex)

/**
 * Vuex store for coffee machine app
 */
export default new Vuex.Store({
  state: { ...defaultState },
  actions,
  mutations,
  getters
})