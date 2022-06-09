// 对数据的映射 可以是函数 类似于计算属性 可以根据statue的值计算出不同的值

export const isLoading = state => state.isLoading

export const isPlaying = state => state.isPlaying
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const hasTarBar = state => state.hasTarBar

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
