<template>
  <div id="personalFm">
    <!-- 头部导航栏 -->
    <van-nav-bar :border="false" class="navbar" @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-down" />
      </template>
      <template #title>
        <span class="title">私人FM</span>
      </template>
    </van-nav-bar>
    <!-- 背景 -->
    <div class="background">
      <img v-if="curSongObj.album" :src="curSongObj.album.picUrl">
    </div>

    <!-- 蒙层 -->
    <div class="background layer">
    </div>
    <!-- FM区域 -->
    <div class="fmBody">
      <!-- 歌曲信息展示区 -->
      <div class="songInfo">
        <!-- 歌曲主要信息区域 -->
        <transition name="van-fade">
          <div class="songMain" v-if="swichPic" @click="swich">
            <van-image
              class="blurPic"
              v-if="curSongObj.album"
              :src="curSongObj.album.picUrl"
              fit="cover"
            />
            <div class="songName van-ellipsis">{{ curSongObj.name }}</div>
            <div class="by van-ellipsis">
              <span v-for="(ar, index) in curSongObj.artists" :key="index">
                <span v-if="index === curSongObj.artists.length - 1">
                  {{ ar.name }}
                </span>
                <span v-else> {{ ar.name }} / </span>
              </span>
            </div>
          </div>
        </transition>
        <!-- 歌词区域 -->
        <transition name="van-fade">
          <div class="songLyric" v-if="!swichPic" @click="swich">
            <div class="lyricMain" v-if="isLyric">
              <ul class="lyric" ref="ul">
                <li v-for="(ly, index) in lyrics" :key="index">
                  <div
                    :class="{
                      active:
                        currentTime >= lyrics[index].timer &&
                        currentTime <
                          (lyrics[index + 1]
                            ? lyrics[index + 1].timer
                            : $refs.audio.duration)
                          ? true
                          : false,
                    }"
                  >
                    <p>
                      {{ ly.lyric }}
                    </p>
                    <p v-for="(tly, index) in tLyrics" :key="index" class="tly">
                      <span v-if="tly.timer === ly.timer">{{ tly.lyric }}</span>
                    </p>
                  </div>
                </li>
                <p class="byuser" v-if="lyricUser">
                  歌词贡献者：{{ lyricUser.nickname }}
                </p>
              </ul>
            </div>
            <div class="errDescribe" v-else>{{ errDescribe }}</div>
          </div>
        </transition>
      </div>
      <!-- 底部功能区域 -->
      <div class="functionalArea">
        <!-- 播放器 -->
        <audio ref="audio" autoplay :src="curSongUrl" />
        <!-- 音乐进度条 -->
        <div class="musicSlider">
          <div class="current">{{ currentTime | formatDuration }}</div>
          <van-slider v-model="percentage" @input="onCurrentTimeInput" />
          <div class="duration">
            {{ duration | formatDuration }}
          </div>
        </div>
        <!-- 功能按钮 -->
        <div class="BTN">
          <div class="close" @click="_trash">
            <van-icon name="close" />
          </div>
          <div class="likeIcon" @click="_like">
            <van-icon name="like" color="#ec4141" v-if="isLike" />
            <van-icon name="like-o" v-else />
          </div>
          <div class="playIcon" @click="_play" v-if="isPause">
            <van-icon name="play-circle-o" />
          </div>
          <div class="pauseIcon" @click="_pause" v-else>
            <van-icon name="pause-circle-o" />
          </div>
          <div class="my-icon nextIcon" @click="_next">
            <van-icon class-prefix="my-icon" name="next" />
          </div>
          <div class="comIcon">
            <van-icon class-prefix="my-icon" name="comment_noline" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFMApi } from '@/api/fm.js'
import { getLyricApi, getSongUrlsByIdApi, likeApi, trashApi } from '@/api/music.js'
export default {
  data () {
    return {
      // 本次请求FM接口得到的数据
      FM: [],
      // 当前正在播放的歌曲索引
      curIndex: 0,
      // 当前正在播放的歌曲对象
      curSongObj: {},
      // 当前正在播放的歌曲的URL
      curSongUrl: '',
      // 当前已播放时长
      currentTime: 0,
      // 歌曲长度
      duration: 0,
      // 当前播放的时间占总时长的百分比
      percentage: 0,
      // 是否正在暂停
      isPause: true,
      // 是否喜欢
      isLike: false,
      // 是否有歌词
      isLyric: false,
      // 获取不到歌词时的描述信息
      errDescribe: '',
      // 原版歌词
      lyrics: [],
      // 歌词贡献者
      lyricUser: {},
      // 翻译版歌词
      tLyrics: [],
      // 封面和歌词切换
      swichPic: true,
      // 发送给评论组件的部分信息
      toCommentInfos: {}
    }
  },
  methods: {
    // 请求FM接口
    async getFmData () {
      const { data: fm } = await getFMApi()
      if (fm.code === 200) {
        this.FM = fm.data
        this.curSongObj = this.FM[0]
        this.getSongUrl(this.curSongObj.id)
        this.getSongLyric(this.curSongObj.id)
      }
    },
    // 获取歌曲Url
    async getSongUrl (id) {
      const { data: res } = await getSongUrlsByIdApi(id)
      if (res.code === 200) this.curSongUrl = res.data[0].url
    },
    // 获取歌词
    async getSongLyric (id) {
      const {
        data: { code, lrc, lyricUser, tlyric }
      } = await getLyricApi(id)
      if (code === 200) {
        if (lrc) {
          this.isLyric = true
          this.lyricUser = lyricUser
          const { lyricsArr } = this.formatLyrics(lrc.lyric)
          this.lyrics = lyricsArr
          const { lyricsArr: tlyricsArr } = this.formatLyrics(tlyric.lyric)
          this.tLyrics = tlyricsArr
        } else {
          this.isLyric = false
          this.errDescribe = '纯音乐，请欣赏'
        }
      } else {
        this.isLyric = false
        this.errDescribe = '获取歌词失败'
      }
    },
    // 移除至垃圾桶
    async _trash () {
      const { data } = await trashApi(this.curSongObj.id)
      if (data.code === 200) {
        this.$msg.success('移除至垃圾桶成功!')
        this._next()
      } else {
        this.$msg.fail(data.msg)
      }
    },
    // 喜欢/取消喜欢
    async _like () {
      this.isLike = !this.isLike
      const { data } = await likeApi(this.curSongObj.id, this.isLike)
      if (data.code === 200) {
        if (this.isLike) this.$msg.success('添加到喜欢列表成功')
        else this.$msg.success('移除成功')
      } else {
        this.isLike = false
        this.$msg.fail(data.msg)
      }
    },
    // 播放
    _play () {
      this.isPause = false
      this.$refs.audio.play()
    },
    // 暂停
    _pause () {
      this.isPause = true
      this.$refs.audio.pause()
    },
    // 下一首
    _next () {
      this.curIndex++
      if (this.FM[this.curIndex]) {
        this.curSongObj = this.FM[this.curIndex]
        this.getSongUrl(this.curSongObj.id)
        this.getSongLyric(this.curSongObj.id)
      } else {
        this.curIndex = 0
        this.getFmData()
      }
    },
    // 调整歌曲进度
    onCurrentTimeInput (v) {
      this.$refs.audio.currentTime = (v / 100) * this.$refs.audio.duration
    },
    // 处理歌词
    formatLyrics (str) {
      const strSource = str.split(/(\[.*\])/).slice(1)
      const lyricsArr = []
      for (let i = 0; i < strSource.length; i = i + 2) {
        if (strSource[i] === '' || strSource[i + 1] === '') continue
        const t = strSource[i].substring(
          strSource[i].indexOf('[') + 1,
          strSource[i].indexOf(']')
        )
        lyricsArr.push({
          timer: (t.split(':')[0] * 60 + parseFloat(t.split(':')[1])).toFixed(
            3
          ),
          lyric: strSource[i + 1]
        })
      }
      return { lyricsArr }
    },
    // 歌词与歌曲信息的切换
    swich () {
      this.swichPic = !this.swichPic
    },
    // 歌词滚动
    lyricScroll () {
      const dom = document.getElementsByClassName('active')[0]
      const ul = this.$refs.ul
      if (ul) {
        if (dom) {
          if (ul.clientHeight * 0.5 > dom.offsetTop) {
            ul.scrollTop = 0
          } else if (dom.offsetTop > ul.scrollHeight - ul.clientHeight * 0.5) {
            ul.scrollTop = ul.scrollHeight - ul.clientHeight
          } else {
            ul.scrollTop = dom.offsetTop - ul.clientHeight * 0.5 + 24
          }
        }
      }
    },
    // 播放暂停
    setPlayer () {
      this.$store.commit('SET_PLAYING_STATE', false)
    }
  },
  mounted () {
    this.getFmData()
    this.$refs.audio.onloadeddata = (event) => {
      this.duration = event.target.duration
    }
    // 当audio中的currentTime发生变化时调用
    this.$refs.audio.ontimeupdate = (event) => {
      const e = event.target
      this.isPause = e.paused
      this.currentTime = e.currentTime
      this.percentage = (e.currentTime / e.duration) * 100
      this.lyricScroll()
    }
    // 当播放到媒体的结束位置时 切换下一首
    this.$refs.audio.onended = () => this._next()
  },
  computed: {
  },
  created () {
    this.setPlayer()
  }
}
</script>

<style lang="less" scoped>
#personalFm {
  width: 100%;
  height: 100%;
  .navbar {
    background-color: transparent;
    .title {
      color: #fff;
      font-size: 16px;
    }
  }
  .fmBody {
    height: 605px;
    .volumeSlider {
      height: 16px;
      display: flex;
      width: 320px;
      margin: 8px auto 0;
      align-items: center;
      .icon {
        color: #fff;
        margin-right: 14px;
        font-size: 12px;
      }
    }
    .songInfo {
      height: 440px;
      position: relative;
      .songMain {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .blurPic {
          width: 260px;
          height: 260px;
          border-radius: 10px;
          overflow: hidden;
        }
        .songName {
          text-align: center;
          width: 300px;
          margin: 16px 0 4px;
          font-size: 16px;
          color: #fff;
        }
        .by {
          text-align: center;
          width: 300px;
          font-size: 14px;
          color: #dcdcdc;
        }
      }
      .songLyric {
        width: 100%;
        height: 100%;
        .lyricMain {
          height: inherit;
          width: inherit;
          padding: 20px;
          box-sizing: border-box;
          .lyric {
            height: inherit;
            width: inherit;
            overflow: scroll;
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
            box-sizing: border-box;
            scroll-behavior: smooth;
            // 隐藏滚动条
            /* Firefox */
            scrollbar-width: none;
            /* IE 10+ */
            -ms-overflow-style: none;
            /* Chrome Safari */
            &::-webkit-scrollbar {
              display: none;
            }
            > li {
              margin: 30px 0;
              font-size: 16px;
              .tly {
                font-size: 12px;
                margin-top: 4px;
              }
              .active {
                color: #fff;
              }
            }
          }
          .byuser {
            letter-spacing: 1px;
            font-size: 14px;
            margin: 50px 0 2px;
          }
        }
        .errDescribe {
          padding-top: 50%;
          text-align: center;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 2px;
        }
      }
    }
    .functionalArea {
      .musicSlider {
        height: 60px;
        display: grid;
        grid-template-columns: 15% 70% 15%;
        align-items: center;
        .current,
        .duration {
          color: #e1e1e1;
          text-align: center;
          font-size: 16px;
        }
      }
      .BTN {
        height: 70px;
        padding: 0 30px;
        color: #f0f0f0;
        display: grid;
        align-items: center;
        grid-template-columns: 18% 18% 28% 18% 18%;
        > div {
          height: 100%;
          text-align: center;
          line-height: 70px;
          font-size: 24px;
        }
        .playIcon,
        .pauseIcon {
          font-size: 48px;
        }
      }
    }
  }
}
.background{
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
  filter: blur(15px);
  &.layer{
    background: #aaa;
    opacity: 0.6;
    filter: none;
  }
}
</style>
