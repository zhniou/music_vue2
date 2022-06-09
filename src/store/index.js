import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from '@/store/actions'
import * as getters from '@/store/getters'
import state from '@/store/satate'
import mutations from '@/store/mutations'
// 通过mutations 修改state时候 会在控制台打印logger
// import createLogger from 'vue/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 检测state修改是否来源于 mutations 否者会警告 开发使用
  strict: true
})
