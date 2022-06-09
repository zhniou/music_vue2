import { playMode } from '@/assets/js/config'

const state = {
  namespaced: true,
  // 加载组件
  isLoading: false,
  isMusicPlayPlaceholder: false,
  // 是否正在播放歌曲
  isPlaying: false,
  // 大播放器默认收起
  fullScreen: false,
  // 播放列表
  playList: [],
  // 歌曲顺序列表 支持多种播放模式
  sequenceList: [],
  // 歌曲播放模式
  mode: playMode.sequence,
  // 当前播放歌曲索引
  currentIndex: -1,
  // 当前歌曲信息
  currentSong: {},
  // 是否存在底部导航栏
  hasTarBar: false
}

export default state
