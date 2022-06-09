<template>
  <div class="singerdetail_container">
    <!-- 顶部 -->
    <van-nav-bar
      left-arrow
      fixed
      @click-left="back"
      title="歌手简介"
    />
    <div class="singer_info">
      <!-- 图片区域 -->
    <div class="singer_img">
      <van-image
        width="100%"
        height="270px"
        fit="cover"
        v-if="this.singerDetailData.artist"
        :src="this.singerDetailData.artist.cover"
      />
    </div>
     <!-- 歌手信息 -->
    <div class="singer_msg">
      <!-- 头像 -->
      <div class="singer_name" v-if="this.singerDetailData.artist">{{this.singerDetailData.artist.name}}</div>
      <div class="singer_fans">
      </div>
      <div class="singer_desc" v-if="this.singerDetailData.identify">
        {{this.singerDetailData.identify.imageDesc}}
      </div>
      <div class="focus">
        <div class="isfocus" v-if="isFocus" @click="toFollow(singerDetailData.artist.id,0)">已关注</div>
        <div v-if="!isFocus" @click="toFollow(singerDetailData.artist.id,1)"><van-icon name="plus" />关注</div>
      </div>
    </div>
    </div>
    <van-tabs v-model="activeName">
     <van-tab title="主页" name="main">
       <div class="singer_detail">
         <span class="title">歌手简介</span>
         <div class="singer_content">
           <p>{{this.singerDescData.briefDesc}}</p>
         </div>
       </div>
     </van-tab>
     <van-tab title="歌曲" name="songs">
       <div class="songs_content">
         <div class="hot_50"><van-icon name="play-circle" color="#ec4141" />播放热门50</div>
         <div class="song_item" v-for="(item,index) in this.hotSongs" :key="item.id" @click="playThisMusic(index)">
           <div class="index">{{index+1}}</div>
           <div class="song_info ellipsis">
             <span class="name">{{item.name}}</span>
             <span class="desc ellipsis">{{item.al.alia}}</span>
           </div>
           <div class="operation">
            <van-icon  class-prefix="my-icon" :class="{ icon: true, notmv: !item.mv }" name="mv" />
           <van-icon class-prefix="my-icon" class="icon opera" name="col_ellipsis" />
           </div>
         </div>
       </div>
     </van-tab>
     <van-tab title="视频" name="mv">
       <div class="mvs_content">
       <div class="item" v-for="item in singerMvs" :key="item.id">
           <div class="left">
           <van-image
             width="100%"
             height="90%"
             fit="cover"
             :src="item.imgurl16v9"
           />
           <div class="time">
             {{item.duration|formatDuration}}
           </div>
         </div>
         <div class="right">
             <div class="name_desc ellipsis2">
               <van-icon  class-prefix="my-icon" class="icon" name="mv" color="#ec4141" />
               {{item.name}}
               </div>
           <div class="publishTime">{{item.publishTime}}</div>
           <div class="play_num">{{item.playCount|formatNumber}} 播放</div>
         </div>
       </div>
       </div>
     </van-tab>
   </van-tabs>
  </div>
</template>

<script>
import { singerDetailApi, singerDescApi, singerSongsApi, singerMvApi, subListApi } from '@/api/singer.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      singerId: '',
      singerDetailData: [],
      singerDescData: [],
      hotSongs: [],
      singerMvs: [],
      isFocus: false,
      activeName: 'main',
      subList: []
    }
  },
  methods: {
    // 获取歌手详情
    async getSingerData () {
      this.singerId = this.$route.query
      const { data: res } = await singerDetailApi(this.singerId.singerid)
      this.singerDetailData = res.data
      this.getSubList()
    },
    // 关注列表
    async getSubList () {
      const { data: sub } = await subListApi()
      if (sub.code === 200) {
        for (var item of sub.data) {
          this.subList.push(item.name)
        }
      }
      const name = this.singerDetailData.artist.name
      this.$nextTick(() => {
        this.isFocus = this.subList.includes(name)
      })
    },
    // 获取歌手描述
    async getSingerDesc () {
      const { data: res } = await singerDescApi(this.singerId.singerid)
      if (res.code === 200) {
        this.singerDescData = res
      }
    },
    // 获取歌手单曲
    async getSingerSongs () {
      const { data: res } = await singerSongsApi(this.singerId.singerid)
      const newData = res.hotSongs.map(item => ({
        id: item.id,
        al: item.al,
        name: item.name,
        ar: item.ar,
        mv: item.mv
      }))
      this.hotSongs = newData
    },
    // 获取歌手Mv
    async getSingerMv () {
      const { data: res } = await singerMvApi(this.singerId.singerid)
      if (res.code === 200) {
        this.singerMvs = res.mvs
      }
    },
    // 关注
    async toFollow (id, t) {
      const { data: follow } = await subListApi(id, t)
      if (follow.code === 200 && t === 1) {
        this.$msg.fail('已关注')
        this.isFocus = true
      } else if (follow.code === 200 && t === 0) {
        this.subList = []
        this.isFocus = false
        this.$msg.fail('已取消关注')
      }
    },
    // 播放当前选择的歌曲
    playThisMusic (index) {
      const item = this.hotSongs
      this.selectPlay({
        item,
        index
      })
    },
    ...mapActions(['selectPlay']),
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getSingerData()
    this.getSingerDesc()
    this.getSingerSongs()
    this.getSingerMv()
  }
}
</script>

<style lang="less" scoped>
.singerdetail_container{
  width: 100%;
  background-color: #fff;
  .singer_info{
    margin-bottom: 20px;
    .singer_msg{
       width: 100%;
       height: 100px;
       margin: 0 auto;
       display: flex;
       flex-direction: column;
       align-items: center;
       font-size: 19px;
       color: #666;
       .singer_name{
         font-size: 30px;
         color: #000;
         margin: 5px;
       }
       .singer_desc{
         font-size: 16px;
         margin: 5px;
       }
       .focus{
         margin-top: 5px;
        div{
        width: 80px;
         height: 30px;
         color: #fff;
         font-size: 14px;
         border-radius: 15px;
         text-align: center;
         line-height: 30px;
         background-color: #ec4141;
        }
        .isfocus{
          background-color: #ccc;
        }
       }
    }
  }
  .singer_detail{
    margin:10px 20px;
    .title{
      font-size: 18px;
      margin: 10px;
      font-weight: 550;
    }
    .singer_content{
      font-size: 16px;
      color: #666;
      margin-top: 10px;
    }
  }
  .songs_content{
     .hot_50{
        font-size: 20px;
        .van-icon {
          font-size: 25px;
          margin-right: 10px;
        }
      }
    .song_item{
      margin: 10px 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      .index{
        flex: 1;
        font-size: 16px;
        color: #666;
        text-align: center;
      }
      .song_info{
        flex: 5;
        .name{
          font-size: 18px;
          color: #000;
          margin-right: 3px;
        }
        .desc{
          font-size: 16px;
          color: #666;
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
  .mvs_content{
   .item{
      display: flex;
    .left{
      flex: 4;
      margin: 7px;
      position: relative;
      align-items: center;
      justify-content: center;
      .time{
        position: absolute;
        right: 5px;
        bottom: 10px;
        color: #fff;
        font-size: 14px;
      }
    }
    .right{
      flex: 6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name_desc{
        font-size: 15px;
        color: #000;
      }
      .publishTime{
        font-size: 12px;
        color: #666;
        margin: 5px;
      }
      .play_num{
        font-size: 12px;
        color: #666;
      }
    }
   }
  }
}
.ellipsis{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.ellipsis2{
overflow:hidden;
text-overflow:ellipsis;
display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:2;
}
.notmv {
  display: none;
}
</style>
