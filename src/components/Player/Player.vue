<template>
<div>
  <!-- 小播放器 -->
  <MiniPlayer
  :time='time'
  v-if="!Boolean(this.currentIndex === -1)&&!fullScreen"
  ></MiniPlayer>
  <!-- 全屏播放器 -->
  <NormalPlayer
  :time='time'
  :progress='progress'
  ref="normalplayer"
  @changetime='getChangeTime'
  @musicNext='next'
  @musicPre='pre'
  v-if="!Boolean(this.currentIndex === -1)&&fullScreen"
  ></NormalPlayer>
  <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"/>

</div>
</template>

<script>
import MiniPlayer from '@/components/Player/MiniPlayer'
import NormalPlayer from '@/components/Player/NormalPlayer'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      time: {
        currentTime: 0,
        duration: 0,
        progress: 0
      }
    }
  },
  components: {
    MiniPlayer,
    NormalPlayer
  },
  methods: {
    getChangeTime (val) {
      this.$refs.audio.currentTime = (val / 100) * this.$refs.audio.duration
    },
    ...mapActions(['switchMusic']),
    // 下一首
    next () {
      if (this.playing === false) {
        this.$store.commit('SET_PLAYING_STATE', true)
      }
      const item = this.currentIndex + 1
      this.switchMusic({
        item
      })
    },
    pre () {
      const item = this.currentIndex - 1
      this.switchMusic({
        item
      })
    }

  },
  computed: {
    ...mapGetters({
      currentSong: 'currentSong'
    }),
    ...mapState({
      playing: state => state.isPlaying,
      fullScreen: state => state.fullScreen,
      currentIndex: state => state.currentIndex
    }),
    // 监听歌曲id
    id () {
      return this.currentSong.id
    },
    // 监听进度条
    progress () {
      const result = this.time.currentTime / this.time.duration * 100
      return isNaN(result) ? 0 : result
    }
  },
  watch: {
    // 监听播放状态
    playing (newVal) {
      this.$nextTick(() => {
        if (newVal) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      })
    },
    // 监听歌曲id id变了，重新加载，重新播放
    id (newValue, oldValue) {
      this.$nextTick(() => {
        if (!oldValue) {
          return
        }
        // 有上一首歌重载
        this.audio.load()
        this.audio.play()
      })
    },
    // 监听进度条自动切换下一曲
    progress () {
      if (this.progress === 100) {
        this.next()
      }
    }
  },
  mounted () {
    this.audio = this.$refs.audio
    // 歌曲播放过程中更新事件
    this.audio.addEventListener('timeupdate', () => {
      this.time.currentTime = this.audio.currentTime
    })
    // 获取歌曲时长
    this.audio.addEventListener('canplay', () => {
      this.time.duration = this.audio.duration
    })
  }
}
</script>

<style>

</style>
