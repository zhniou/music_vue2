<template>
 <div class="mini_player"  :class="[$route.path === '/index' || $route.path === '/search/hotsearch' ? 'mini_hight' : '', $route.path === '/userinfo'&&hasTarBar ?'mini_hight':'']">

   <!-- 专辑图片 -->
   <div class="img_wrapper" @click="showFullScreen">
      <van-image
      :class="{pause:!playing}"
      round
      width="50px"
      height="50px"
      fit="cover"
      v-if="currentSong.al"
      :src="currentSong.al.picUrl"
      />
    </div>

      <!-- 文本区域 -->
      <div class="middle" @click="showFullScreen">
        <div class="text ellipsis1">
          <span class="song_name">{{currentSong.name}}</span>
          <span> - </span>
          <span class="desc" v-for="ar in currentSong.ar" :key="ar.id">{{ar.name}}</span>
        </div>
        <!-- 进度条 -->
        <div class="jindu">已经播放 <span>{{time.currentTime|formatDuration}} / {{time.duration|formatDuration}}</span></div>
      </div>

      <!-- 控制按键 -->
      <div class="control">
        <van-icon v-if="!playing" name="play-circle-o" @click="setPlayer()" />
        <van-icon v-else name="pause-circle-o" @click="setPlayer()"/>
        <van-icon name="apps-o" class="apps" @click="showPlaylist"/>
      </div>
      <Playlist
      ref="playlist"
      @playmusic='playMusic'
      ></Playlist>
   </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Playlist from '@/components/Player/Playlist'
export default {
  components: {
    Playlist
  },
  data () {
    return {
      name: 'miniPlayer',
      picUrl: ''
    }
  },
  props: ['time'],
  methods: {
    ...mapActions(['openPlayerScreen', 'setPlayer', 'playPlayer']),
    showFullScreen () {
      this.openPlayerScreen()
    },
    // 播放状态设置
    setPlayer () {
      this.$store.commit('SET_PLAYING_STATE', !this.playing)
    },
    // 展示歌单列表
    showPlaylist () {
      this.$refs.playlist.showPlaylist = true
    },
    playMusic (val) {
      this.Progress = 0
      const item = val
      // 播放当前选择的歌曲
      this.switchMusic({
        item
      })
    },
    ...mapActions(['switchMusic'])

  },
  computed: {
    ...mapState({
      playing: state => state.isPlaying,
      hasTarBar: state => state.hasTarBar
    }),
    ...mapGetters({
      currentSong: 'currentSong'
    })
  },
  watch: {
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
// 旋转动画
@keyframes rotate{
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
.mini_player{
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 60px;
  z-index: 1000;
  background-color: #fff;
  align-items: center;
  padding: 2px 0;
  .img_wrapper{
    flex: 0 0 40px;
    padding: 0 10px 0 10px;
    margin-top: 6px;
    .van-image{
    animation: rotate 10s linear infinite;
     &.pause{
      animation-play-state: paused;
    }
    }
  }
  .middle{
    display: flex;
    flex: 3;
    flex-direction: column;
    overflow: hidden;
    justify-content: center;
    margin-right: 5px;
   .text{
     margin-top: 3px;
     .song_name{
       font-size: 16px;
       font-weight:500;
       color: #000;
     }
     .desc{
       font-size: 16px;
       color: #000;
     }
   }
   .jindu{
     font-size: 14px;
     color: #ccc;
   }
  }
  .control{
    flex: 1;
    font-size: 25px;
    .apps{
      margin-left: 5px;
    }
  }
}
.mini_hight{
  margin-bottom: 45px;
}
</style>
