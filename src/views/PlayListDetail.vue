<template>
  <div class="playlist_detail_container">
    <!-- 头部 -->
    <van-nav-bar title="歌单详情" fixed left-arrow @click-left='back' @click-right="goSearch">
     <template #right>
       <van-icon name="search" size="18" />
     </template>
   </van-nav-bar>

   <!-- 头部图片区域 -->
   <div class="playlist_info">

     <!-- 背景 -->
    <div class="background">
      <img :src="playlistInfo.coverImgUrl" width="100%" height="100%" alt="">
    </div>

    <!-- 蒙层 -->
    <div class="background layer">
    </div>

     <div class="image_info">
       <van-image
        width="150px"
        height="150px"
        fit="contain"
        :src="playlistInfo.coverImgUrl"
      />

      <div class="text_info">
        <div>
          <span class="ellipsis2">{{playlistInfo.name}}</span>
        </div>
        <!-- 歌单创作者 -->
       <div class="creator">
         <div class="avatar">
           <van-image
             round
             width="30px"
             height="30px"
             :src="creator.avatarUrl"
             @click="goUserInfo(creator.userId)"
           />
           <span class="ellipsis1">{{creator.nickname}}</span>
         </div>
         <div class="description ellipsis1">
           <p>{{playlistInfo.description}}</p>
         </div>
       </div>
      </div>
     </div>
     <div class="operation_info">
        <div>
          <!-- 播放数 -->
         <van-icon name="play-circle-o" size="30" />
         <span>{{palyListDynamicList.playCount|formatNumber}}</span>
        </div>
        <div @click="showCommentPopup">
          <!-- 评论数 -->
         <van-icon name="chat-o"  size="30"/>
         <span>{{palyListDynamicList.commentCount|formatNumber}}</span>
        </div>
        <div>
          <!-- 订阅数 -->
         <van-icon name="share-o"  size="30"/>
         <span>{{palyListDynamicList.bookedCount|formatNumber}}</span>
        </div>
     </div>
   </div>

   <!-- 歌曲列表区域 -->
   <div class="songs_list">
     <div class="song_item" v-for="(item,index) in playlistDetailList" :key="item.id" @click="playThisMusic(playlistDetailList.songs,index)">
       <div class="image">
         <van-image
          width="55px"
          height="55px"
          fit="cover"
          radius="5px"
          :src="item.al.picUrl"
        />
       </div>
       <div class="song_info">
         <div class="song_name ellipsis1"><span>{{item.name}}</span></div>
         <!-- 歌手信息 -->
         <div class="artistsInfo ellipsis1">
            <div class="artist" v-for="(ar, index) in item.ar" :key="index">
           <span class="ellipsis1" v-if="index === item.ar.length - 1"> {{ ar.name }} </span>
              <span v-else class="ellipsis1"> {{ ar.name }} / </span>
            </div>
             <div><span class="by ellipsis1"> - {{ item.al.name }} </span></div>
         </div>
       </div>
       <div class="operation">
           <!-- mv -->
        <van-icon v-if="item.mv" class-prefix="my-icon"  name="mv" />
         <!-- 操作 -->
        <van-icon class-prefix="my-icon" class="icon opera" name="col_ellipsis" />
       </div>
     </div>
   </div>

   <!-- 评论 -->
   <div class="comment" v-if="showPopup">
     <van-popup
      v-model="showPopup"
      position="bottom"
      :round=false
      :style="{ height: '100%' ,width:'100%'}"
      >
       <Comment @closeShowPopup='getClosePopup' :playListId='playListId'></Comment>
     </van-popup>
   </div>
  </div>
</template>

<script>
import { playlistDetailApi, palyListDynamicApi, palyListInfoApi } from '../api/playlist'
import { mapActions } from 'vuex'
import Comment from '@/components/Comment'
export default {
  components: {
    Comment
  },
  data () {
    return {
      playlistDetailList: {},
      playlistInfo: {},
      palyListDynamicList: {},
      creator: {},
      showPopup: false,
      playListId: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    goSearch () {
      this.$router.push('/search')
    },
    // 获取歌单详情
    async playlistDetail () {
      const { data: res } = await playlistDetailApi(this.$route.query.playlistid)
      const newData = res.songs.map(item => ({
        id: item.id,
        al: item.al,
        name: item.name,
        ar: item.ar
      }))
      this.playlistDetailList = newData
      // console.log(this.playlistDetailList)
    },
    // 获取歌单动态详情
    async palyListDynamic () {
      const { data: res } = await palyListDynamicApi(this.$route.query.playlistid)
      this.palyListDynamicList = res
      const { data: re } = await palyListInfoApi(this.$route.query.playlistid)
      this.playlistInfo = re.playlist
      this.playListId = this.playlistInfo.id
      console.log(this.playListId)
      this.creator = re.playlist.creator
    },
    // 用户详情页面
    goUserInfo (userId) {
      this.$router.push({
        path: '/userinfo',
        query: { userId }
      })
    },
    // 播放当前选择的歌曲
    playThisMusic (item, index) {
      item = this.playlistDetailList
      this.selectPlay({
        item,
        index
      })
    },
    ...mapActions(['selectPlay']),
    // 评论
    showCommentPopup () {
      this.showPopup = true
    },
    getClosePopup (val) {
      this.showPopup = val
    }

  },
  mounted () {
    this.playlistDetail()
    this.palyListDynamic()
  }
}
</script>

<style lang="less" scoped>
.playlist_detail_container{

  z-index: 999;
  .playlist_info{
    position: relative;
    padding-bottom: 30px;
    margin-top: 46px;
    .image_info{
      display: flex;
      .van-image{
        margin: 20px;
        width: 150px;
      }
      .text_info{
        margin: 20px 20px 20px 0;
        flex: 1;
        span{
          font-size: 20px;
          color: #fff;
        }
        .creator{
          .avatar{
            margin-top: 10px;
            .van-image{
              margin: 0;
              margin-right: 5px;
            }
            span{
              font-size: 15px;
            }
          }
          .description{
            margin-top: 10px;
            color: #fff;
            font-size: 15px;
          }
        }

      }
    }
    .operation_info{
      position:absolute ;
      background-color: #fff;
      width: 70%;
      padding: 10px 20px;
      border-radius: 30px;
      display: flex;
      left: 50%;
      top: 90%;
      transform: translate(-50%,0);
       box-shadow: 3px 4px 3px 3px #eee;
      div{
         flex: 1;
         text-align: center;
         border-right: 1px solid #eee;
         span{
           font-size: 14px;
           vertical-align: middle;
           margin-left: 5px;
         }
      }
    }
  }
  .songs_list{
    margin: 5px;
    margin-top: 40px;
    .song_item{
      display: flex;
      align-items: center;
      margin: 4px 0;
      .image{
        width: 70px;
        font-size: 18px;
        text-align: center;
      }
      .song_info{
        flex: 1;
        .song_name{
          font-size: 17px;
        }
        .artistsInfo{
          display: flex;
          font-size: 14px;
          color: #666;
          margin-top: 5px;
        }
      }
      .operation{
        width: 60px;
        text-align: right;
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
.van-popup{
  border-radius: 0;
}
</style>
