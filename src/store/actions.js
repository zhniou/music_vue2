import * as types from '@/store/mutation-types'

export const selectPlay = function ({ commit, state }, { item, index }) {
  commit(types.SET_PLAYLIST, item)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
}

// 全屏播放器
export const openPlayerScreen = function ({ commit, state }) {
  commit(types.SET_FULL_SCREEN, true)
}

// 关闭全屏
export const closePlayerScreen = function ({ commit, state }) {
  commit(types.SET_FULL_SCREEN, false)
}

// 播放停止与开始
export const setPlayer = function ({ commit, state }) {
  commit(types.SET_PLAYING_STATE, false)
}

// 添加播放列表音乐
export const addMusic = function ({ commit, state }, { item }) {
  commit(types.ADD_PLAYLIST, item)
}

// 添加播放列表音乐
export const switchMusic = function ({ commit, state }, { item }) {
  commit(types.SET_CURRENT_INDEX, item)
}

// export const selectPlay = function ({ commit, state }, { item, index }) {
//   commit(types.SET_SEQUENCE_LIST, item)
//   commit(types.SET_PLAYLIST, item)
//   commit(types.SET_CURRENT_INDEX, index)
//   commit(types.SET_FULL_SCREEN, true)
//   commit(types.SET_PLAYING_STATE, true)
// }
