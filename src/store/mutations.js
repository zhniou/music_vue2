// 修改数据 定义怎么对数据修改的逻辑 mutation相当于一个函数 函数名就是mutaton_type.js中定义的值
import * as types from './mutation-types'

const mutations = {
  // 加载图标
  // [types.SET_FULL_SCREEN] (state, flag) {
  //   state.isLoading = 2
  // },
  // flag是修改的对象 state是被修改的对象
  [types.SET_PLAYING_STATE] (state, flag) {
    state.isPlaying = flag
    console.log(state.isPlaying, flag, '是否播放')
  },
  // 是否全屏显示播放器
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
    console.log(state.fullScreen, '是否全屏显示播放器')
  },
  // 播放列表
  [types.SET_PLAYLIST] (state, item) {
    state.playList = item
    console.log(state.playList, '播放列表')
  },
  [types.ADD_PLAYLIST] (state, item) {
    state.playList.push(item)
    console.log(state.playList, '添加音乐')
  },
  // 播放顺序
  [types.SET_SEQUENCE_LIST] (state, item) {
    state.sequenceList.push(item)
    console.log(state.sequenceList, '播放顺序')
  },
  // 播放模式
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
    console.log(state.mode, '播放模式')
  },
  // 当前播放音乐的序号
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
    console.log(state.currentIndex, '当前播放音乐的序号')
  },
  // 是否有TarBar
  [types.SET_TARBAR] (state, flag) {
    state.hasTarBar = flag
    console.log(state.hasTarBar)
  }
}

export default mutations
