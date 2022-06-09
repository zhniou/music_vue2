<template>
  <div class="normal_container">
    <!-- 背景 -->
    <div class="background">
      <img v-if="currentSong.al" :src="currentSong.al.picUrl">
    </div>

    <!-- 蒙层 -->
    <div class="background layer">
    </div>

    <!-- 头部导航 -->
      <van-nav-bar  class="navbar" @click-left="closeFullScreen">
        <template #left>
          <van-icon
            name="arrow-down"
            class="icon close"
            size="20px"
          />
        </template>
        <template #title>
          <div class="tittle">
           <div class="songName"><span>{{currentSong.name}} - <span v-for="ar in currentSong.ar" :key="ar.id">{{ar.name}}</span></span></div>
          </div>
        </template>
      </van-nav-bar>

      <!-- 中间的唱片 -->
      <div class="middle" ref="CD" v-show="!isShowLyric">
        <div class="CD-wrapper" @click.stop="showLyric">
          <div class="CD_image">
           <van-image
           round
           width="200px"
           height="200px"
           :class="[{'pause':!playing}]"
           v-if="currentSong.al"
           :src="currentSong.al.picUrl"
         />
         </div>
        </div>

      </div>

      <!-- 中间的歌词 -->
      <div class=" lyrics" v-show="isShowLyric" @click.stop="showLyric">
        <ul class="lrc" @click="lyricScroll" ref="lrc">
          <li
           v-for="(lrc,key,index) in lyricData"
           :key="index"
           :class="['lrc_item','ellipsis1',{'active':parseInt(time.currentTime)>=keyArr[index]&&parseInt(time.currentTime)<keyArr[index+1]}]"
           >{{lrc}}{{lyricScroll(key,index)}}</li>
        </ul>
        <!-- <div class="nolrc">纯享音乐，请欣赏!</div> -->
      </div>

      <!-- 底部的操作按键 -->
      <div class="bottom_opera">
        <!-- 上方操作键 -->
        <div class="operators top">
          <div  @click="like">
            <van-icon name="like" color="#ec4141" v-if="isLike" />
            <van-icon name="like-o" v-else /></div>
          <!-- 歌词 -->
          <van-icon class-prefix="my-icon" name="lyric" @click.stop="showLyric" />
          <!-- 评论 -->
          <van-icon class-prefix="my-icon" name="comment_noline" @click="showComment"/>
          <van-icon class-prefix="my-icon" name="share" />
        </div>

        <!-- 进度条 -->
        <div class="process middle">
          <span>{{time.currentTime|formatDuration}}</span>
           <van-slider
              v-model="Progress"
              class="slider"
              @input="changeMusicCurrentTime(Progress)"
            />
          <span>{{time.duration|formatDuration}}</span>
        </div>

        <!-- 下方操作键 -->
        <div class="operators" >
          <!-- 列表循环 -->
          <van-icon class-prefix="my-icon" name="sequence" size="26px"/>
          <!-- 随机播放 -->
          <!-- <van-icon class-prefix="my-icon" name="random" /> -->
          <!-- 单曲循环 -->
          <!-- <van-icon class-prefix="my-icon" name="loop" /> -->
          <!-- 上一首 -->
          <van-icon class-prefix="my-icon" name="pre" size="23px" @click="pre"/>
          <!-- 播放暂停 -->
          <van-icon v-if="!playing" name="play-circle-o" size="32px" @click="setPlayer"/>
          <van-icon v-else name="pause-circle-o" size="32px" @click="setPlayer"/>
          <!-- 下一首 -->
          <van-icon class-prefix="my-icon" name="next" size="23px" @click="next"/>
          <!-- 音乐列表 -->
          <van-icon name="qr" size="27px" @click="showPlaylist"/>
        </div>
      </div>

      <Playlist
      ref="playlist"
      @playmusic='playMusic'
      ></Playlist>
      <!-- <Comment ref="commentShow"></Comment> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { getLyricApi, likeApi } from '@/api/music.js'
// import Comment from '@/components/Comment'
import Playlist from '@/components/Player/Playlist'
export default {
  name: 'normalPlayer',
  components: {
    // Comment,
    Playlist
  },
  data () {
    return {
      isShowLyric: false,
      lyricData: {},
      keyArr: [],
      // 音乐播放进度百分比
      Progress: this.progress,
      // 是否喜欢
      isLike: false
    }
  },
  props: ['time', 'progress'],
  methods: {
    ...mapActions(['closePlayerScreen']),
    closeFullScreen () {
      this.closePlayerScreen()
    },
    // 关闭歌词
    showLyric () {
      this.isShowLyric = !this.isShowLyric
    },
    // 获取歌词
    async getLyricData () {
      const { data: res } = await getLyricApi(this.currentSong.id)
      console.log(res.lrc.lyric)
      // 处理歌词，转化成key为时间，value为歌词的对象
      const lyricArr = res.lrc.lyric.split('[').slice(1) // 先以[进行分割
      const lrcObj = {}
      lyricArr.forEach(item => {
        const arr = item.split(']')
        // 时间换算成秒
        const m = parseInt(arr[0].split(':')[0])
        const s = parseInt(arr[0].split(':')[1])
        arr[0] = m * 60 + s
        if (arr[1] !== '\n') { // 去除歌词中的换行符
          lrcObj[arr[0]] = arr[1]
        }
      })
      // 存储数据
      this.lyricData = lrcObj
      console.log(this.lyricData)
      for (var i in this.lyricData) {
        this.keyArr.push(i)
      }
    },
    // 展示评论
    showComment () {
    },
    // 播放暂停
    setPlayer () {
      this.$store.commit('SET_PLAYING_STATE', !this.playing)
    },
    format (ms) {
      let res = ''
      let h = Math.floor(ms / 3600) % 24
      let m = Math.floor(ms / 60) % 60
      let s = Math.floor(ms / 1) % 60
      if (h > 0) {
        h = h < 10 ? '0' + h : h
        res += `${h}:`
      }
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      res += `${m}:${s}`
      return res
    },
    // 歌词滚动
    lyricScroll (key, index) {
      const lrc = this.$refs.lrc
      if (key < this.time.currentTime && key > this.time.currentTime - (this.keyArr[index + 1] - this.keyArr[index])) {
        lrc.style.marginTop = -((index - 4) * 50) + 'px'
      }
    },
    // 拖拽进度条控制进度
    changeMusicCurrentTime (val) {
      this.$emit('changetime', val)
    },
    // 展示歌单
    showPlaylist () {
      this.$refs.playlist.showPlaylist = true
    },
    // 喜欢/取消喜欢
    async like () {
      this.isLike = !this.isLike
      const { data } = await likeApi(this.currentSong.id, this.isLike)
      if (data.code === 200) {
        if (this.isLike) this.$msg.success('添加到喜欢列表成功')
        else this.$msg.success('移除成功')
      } else {
        this.isLike = false
        this.$msg.fail(data.msg)
      }
    },
    // 下一首
    next () {
      this.Progress = 0
      this.$emit('musicNext', this.currentSong)
      this.getLyricData()
    },
    // 上一首
    pre () {
      this.Progress = 0
      this.$emit('musicPre')
      this.getLyricData()
    },
    playMusic (val) {
      this.Progress = 0
      const item = val
      // 播放当前选择的歌曲
      this.switchMusic({
        item
      })
      this.getLyricData()
    },
    ...mapActions(['switchMusic'])
  },
  mounted () {
    this.getLyricData()
  },
  computed: {
    ...mapGetters({
      currentSong: 'currentSong'
    }),
    ...mapState({
      playing: state => state.isPlaying
    })
  },
  watch: {
    progress () {
      const result = this.time.currentTime / this.time.duration * 100
      return isNaN(result) ? 0 : result
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
.normal_container{
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #eee;
     .van-nav-bar{
       background-color: transparent;
       font-size: 18px;
       .songName{
         display: inline-block;
       }
     }
     .middle{
      //  position: relative;
       flex: 1;
       .CD-wrapper{
         width: 270px;
         height: 270px;
         background-color: #000;
         border-radius: 50%;
         position: absolute;
         left: 50%;
         top: 0%;
         transform: translate(-50%,30%);
         display: flex;
         align-items: center;
         justify-content: center;
         .CD_image{
           .van-image{
            width: 70%;
            height: 70%;
            border-radius: 50%;
            animation: rotate 10s linear infinite;
            &.pause{
              animation-play-state: paused;
            }
            }
         }
       }
     }
     .lyrics{
       flex: 1;
       overflow: hidden;
       padding: 10px;
       .lrc{
         text-align: center;
         color: #fff;
         font-size: 17px;
         .lrc_item{
          //  margin: 20px 0;
           height: 50px;
           box-sizing: border-box;
           line-height: 50px;
           ul{
             li{
               transition: 0.3s;
             }
           }
         }
       }
     }
     .bottom_opera{
       width: 100%;
       height: 150px;
       .operators{
         color: #fff;
         display: flex;
         justify-content: space-around;
         align-items: center;
       }
       .process{
         text-align: center;
         margin: 15px;
         display: flex;
         align-items: center;
         justify-content: center;
         .van-slider{
           margin: 0 10px;
         }
         span{
           font-size: 14px;
           color: #fff;
         }
       }
     }
}
.background{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
  filter: blur(15px);
  &.layer{
    background: #aaa;
    opacity: 0.3;
    filter: none;
  }
}
.none{
  display: none;
}
.van-progress{
  width: 65%;
  margin: 0 5px;
}

// 当前播放的歌词
.active{
  font-size: 19px;
  font-weight: 550;
}
</style>
