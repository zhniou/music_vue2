<template>
  <div class="daily_recommend">
    <!-- 头部区域 -->
     <van-nav-bar
     fixed
     title="每日推荐"
     left-text="返回"
     left-arrow
     @click-left="goBack"
    >
     </van-nav-bar>

     <!-- 图片区域 -->
     <div class="headerBox">
       <van-image
         width="100%"
         height="100%"
         fit="cover"
         position="center"
         src="https://p1.music.126.net/rzjue3XJZQRghsSjl5JbYw==/18699394254857669.jpg"
       />
       <div class="data">{{today}}</div>
       <div class="history">今日推荐</div>
     </div>

     <!-- 全部播放按钮 -->
     <div class="playall">
       <van-icon class="icon" color="#ec4141" name="play-circle" />
       <span class="all_text">播放全部</span>
     </div>

     <!-- 音乐列表 -->
     <div class="songList" :class="{hasPadding:showPlayer}">
       <div class="songItem" v-for="(item,index) in dailySong" :key="item.id" @click="playThisMusic(item,index)">
           <!-- 图片区域 -->
         <van-image
          class="song_img"
          radius="7px"
          width="50px"
          height="50px"
          fit="cover"
          :src="item.al.picUrl"
          />

          <!-- 文字描述区域 -->
         <div class="song_describe ellipsis">
            <!-- 歌曲信息 -->
          <div class="songInfo">
            <div class="song_name">
              <span>{{item.name}}</span>
            </div>
            <div class="reason ellipsis">
              <span>{{ reasonMsg(item.id) }}</span>
            </div>
          </div>

          <!-- 歌手信息 -->
          <div class="artistsInfo ellipsis">
            <div class="artist" v-for="(ar, index) in item.ar" :key="index">
           <span v-if="index === item.ar.length - 1"> {{ ar.name }} </span>
              <span v-else> {{ ar.name }} / </span>
          </div>
            <span class="by"> - {{ item.al.name }} </span>
          </div>
         </div>

         <!-- 尾部操作区域 -->
        <div class="operation">
          <!-- mv -->
        <van-icon class-prefix="my-icon" :class="{ icon: true, notmv: !item.mv }" name="mv" />
         <!-- 操作 -->
        <van-icon class-prefix="my-icon" class="icon opera" name="col_ellipsis" />
        </div>
       </div>
     </div>
     <!-- 加载组件 -->
     <loading></loading>
  </div>
</template>

<script>
import { getDailyRecom } from '@/api/music.js'
import Loading from '../components/Loading.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: { Loading },
  data () {
    return {
      dailySong: [],
      recommendReasons: [],
      songidlist: [],
      bgimg: ''
    }
  },
  methods: {
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    // 获取每日推荐歌曲
    async getDailyRecommend () {
      // 加载样式
      // this.$store.commit('showLoading')
      const { data: res } = await getDailyRecom()
      if (res.code === 200) {
        const newData = res.data.dailySongs.map(item => ({
          id: item.id,
          al: item.al,
          name: item.name,
          ar: item.ar
        }))
        this.dailySong = newData
        console.log(this.dailySong)
        this.recommendReasons = res.data.recommendReasons
        this.bgimg = res.data.dailySongs[2].al.picUrl
        // 保存日推歌单的id列表
        for (let i = 0; i < res.data.dailySongs.length; i++) {
          this.songidlist.push(res.data.dailySongs[i].id)
        }
      }
      // 关闭加载样式
      // this.$store.commit('hiddenLoading')
    },
    // 将推荐理由和歌曲匹配起来
    reasonMsg (id) {
      for (let i = 0; i < this.recommendReasons.length; i++) {
        if (this.recommendReasons[i].songId === id) return this.recommendReasons[i].reason
      }
    },
    // 播放当前选择的歌曲
    playThisMusic (item, index) {
      item = this.dailySong
      this.selectPlay({
        item,
        index
      })
    },
    ...mapActions(['selectPlay'])
  },
  created () {
    this.getDailyRecommend()
  },
  computed: {
    today: function () {
      const D = new Date()
      let m = D.getMonth() + 1
      let d = D.getDate()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      return `日${d}/月${m}`
    },
    ...mapGetters({
      currentSong: 'currentSong'
    }),
    ...mapState({
      showPlayer: state => (state.currentIndex >= 0)
    })
  }
}
</script>

<style lang="less" scoped>
.daily_recommend{
  .headerBox{
  // background-color: pink;
  margin-top: 46px;
  position: relative;
  height: 220px;
  overflow: hidden;
  width: 100%;
  .data{
    position: absolute;
    left: 10px;
    bottom: 40px;
    color: #fff;
  }
  .history{
    position: absolute;
    left: 10px;
    bottom: 10px;
    color: #fff;
    font-size: 15px;
  }

}
  .playall{
    margin: 10px auto;
    padding: 5px;
    background-color:#fff;
    display: flex;
      .all_text{
    margin-left: 10px;
    font-size: 17px;
    font-weight: 550;
  }
  }

  .songList{
    .songItem{
      display: flex;
      margin: 10px 10px;
      .song_img{
        flex: 1;
      }
      .song_describe{
        flex: 5;
        margin-left: 5px;
        .songInfo{
        display: flex;
        .song_name{
          font-size: 18px;
        }
        .reason{
          color: red;
          font-size: 14px;
          margin: 3px 0 0 5px;
          span{
             background-color: #fffcd7;
          }
        }
      }
      .artistsInfo{
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        display: flex;
      }
      }
      .operation{
        flex: 1;
         text-align: right;
        .my-icon{
          color: #666;
        }
      }

    }
  }
}

.notmv {
  display: none;
}
.hasPadding{
  padding-bottom: 60px;
}
</style>
