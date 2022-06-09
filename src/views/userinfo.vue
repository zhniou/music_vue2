<template>
  <div class="mine_container">
    <!-- 导航栏 -->
    <van-nav-bar
     title="用户中心"
     fixed left-text="返回"
     left-arrow
     @click-left="back"
     v-if="this.myid!=this.userInfo.userId"
     >
     <template #right>
       <van-icon name="search" size="20" color="#fff" @click="goSearch" />
     </template>
    </van-nav-bar>

     <!-- 导航栏 -->
    <van-nav-bar title="我的" fixed left-text="返回" left-arrow v-else>
      <template #left>
        <van-icon
          class-prefix="my-icon"
          name="meau"
          class="menuicon"
          size="20"
          color="#fff"
          @click="showPopup"
        />
      </template>
     <template #right>
       <van-icon name="search" size="20" color="#fff" @click="goSearch" />
     </template>
    </van-nav-bar>

    <!-- 头像区域 -->
    <div class="avatar">
      <div class="avatar_img">
        <van-image
          width="80px"
          height="80px"
          round
          :src="userInfo.avatarUrl"
          ></van-image>
      </div>
      <div class="avatar_des">
        <div class="nickname">{{userInfo.nickname}}</div>
        <div class="info">
          <div class="follow" @click="toFollow" v-if="this.myid!=this.userInfo.userId">
            <div>
              <span v-if="userInfo.followed==true">取消关注</span>
              <span v-else>关注</span>
            </div>
            <span>{{userInfo.followTime}}</span>
          </div>
          <span>{{userInfo.follows}} 关注</span>
          <span>{{userInfo.followeds}} 粉丝</span>
          <span>Lv.{{level}}</span>
        </div>
      </div>
    </div>

    <!-- 我喜欢的音乐 -->
    <div class="like_music" @click="goPlaylistDetail(item.id)" v-for="item in userLikePlayList" :key="item.id">
      <div class="like_img">
        <van-image
          width="70px"
          height="70px"
          radius="6px"
          :src="item.coverImgUrl"
        ></van-image>
      </div>
      <div class="playlist_name">
        <div><span class="name ellipsis1">{{item.name}}</span></div>
        <div><span>{{item.trackCount}}首</span></div>
      </div>
      <!-- 心动模式 -->
      <div class="like_icon">
        <van-icon name="like"  size="20px" color="#ec4141"/>
      </div>
    </div>

    <!-- 创建的歌单和收藏的歌单 -->
    <van-tabs v-model="active" sticky scrollspy background="#f1f2f3">
      <van-tab title="创建歌单" name="create">
        <div class="create_playlist">
          <div class="create_title"><span>创建歌单({{userCreatePlayList.length}}个)</span></div>
          <div class="playlist_list">
            <div class="playlist_item" v-for="item in userCreatePlayList" :key="item.id" @click="goPlaylistDetail(item.id)">
              <van-image
              width="70px"
              height="70px"
              radius="6px"
              :src="item.coverImgUrl"
              ></van-image>
              <div class="playlist_desc">
                <div class="playlist_name ellipsis1">{{item.name}}</div>
                <div class="count ellipsis1">{{item.trackCount}}首</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="收藏歌单" name="collection">
        <div class="collection_playlist">
          <div class="collection_title"><span>收藏歌单({{userSubPlayList.length}}个)</span></div>
          <div class="playlist_list">
            <div class="playlist_item" v-for="item in userSubPlayList" :key="item.id" @click="goPlaylistDetail(item.id)">
              <van-image
              width="70px"
              height="70px"
              radius="6px"
              :src="item.coverImgUrl"
              fit="cover"
              ></van-image>
              <div class="playlist_desc">
                <div class="playlist_name ellipsis1">{{item.name}}</div>
                <div class="count ellipsis1">{{item.trackCount}}首  by {{item.creator.nickname}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <TarBar v-if="this.myid===this.userInfo.userId"></TarBar>
    <SideBar ref="popup"></SideBar>
  </div>
</template>

<script>
import { userPlaylistApi, userSubCountApi, userInfoApi, followApi } from '@/api/user.js'
import TarBar from '@/components/TarBar'
import SideBar from '@/components/SideBar'
export default {
  components: {
    TarBar,
    SideBar
  },
  data () {
    return {
      userMsg: {},
      playListCount: {},
      // 我喜欢的音乐
      userLikePlayList: [],
      // 用户创建的歌单
      userCreatePlayList: [],
      // 收藏歌单
      userSubPlayList: [],
      active: 'create',
      userInfo: {},
      level: '',
      followText: '',
      myid: '',
      hastarber: true

    }
  },
  methods: {
    // 搜索页面
    goSearch () {
      this.$router.push('./search')
    },
    back () {
      this.$router.go(-1)
    },
    // 获取用户信息
    async getUserMsg () {
      this.userMsg.userId = this.$route.query.userId
      this.myid = JSON.parse(localStorage.getItem('userinfo')).userId
      const { data: res } = await userInfoApi(this.userMsg.userId)
      this.userInfo = res.profile
      this.level = res.level
    },
    async getUserPlaylist () {
      // 获取用户信息 , 歌单，收藏，mv, dj 数量
      const { data: count } = await userSubCountApi()
      this.playListCount = count
      // 获取用户歌单
      const uid = this.userMsg.userId
      const { data: res } = await userPlaylistApi(uid)
      if (res.code === 200) {
        for (let i = 0; i < res.playlist.length; i++) {
          if (res.playlist[i].specialType === 5) {
            this.userLikePlayList.push(res.playlist[i])
          } else if (res.playlist[i].userId === uid) {
            this.userCreatePlayList.push(res.playlist[i])
          } else {
            this.userSubPlayList.push(res.playlist[i])
          }
        }
      }
      // console.log(res)
      // console.log(this.userLikePlayList)
    },
    // 关注取消关注
    async toFollow () {
      if (this.userInfo.followed === true) {
        const cancelFollow = await followApi(this.userMsg.userId, 0)
        console.log(cancelFollow)
        this.$msg.fail('已取消关注')
        this.getUserMsg()
      } else {
        const follow = await followApi(this.userMsg.userId, 1)
        console.log(follow)
        this.$msg.fail('已关注')
        this.getUserMsg()
      }
    },
    goPlaylistDetail (playlistid) {
      this.$router.push({
        path: '/playlistdetail',
        query: { playlistid }
      })
    },
    showPopup () {
      this.$refs.popup.popupShow = true
    },
    hasTarBar () {
      console.log(this.myid, this.userMsg.userId)
      if (this.myid === Number(this.userMsg.userId)) {
        this.$store.commit('SET_TARBAR', true)
      } else {
        this.$store.commit('SET_TARBAR', false)
      }
    }
  },
  created () {
    this.getUserMsg()
    this.getUserPlaylist()
  },
  mounted () {
    this.hasTarBar()
  },
  computed: {
  }
}
</script>

<style lang="less" scope>
.mine_container{
  padding-top: 100px;
  background-color: #f1f2f3;
  padding-bottom: 80px;
  .avatar{
    background-color: #fff;
    width: 92%;
    margin: 0 auto 20px;
    position: relative;
    padding-top: 50px;
    text-align: center;
    border-radius: 12px;
    .avatar_img{
      position:absolute ;
      left: 46%;
      top: 0;
      transform: translate(-40%,-50%);
    }
    .avatar_des{
      padding:0 0 20px 0;
      .nickname{
        font-size: 20px;
        margin: 10px 0;
      }
      .info{
        font-size: 14px;
        color: #666;
        .follow{
          border: 1px solid #666;
          width: 140px;
          margin: 5px auto;
          padding: 5px;
          border-radius: 16px;
          span{
            display: block;
            font-size: 10px;
          }
        }
        span{
          margin-right: 10px;
        }
      }
    }
  }
  .like_music{
    background-color: #fff;
    width: 92%;
    margin: 0 auto 15px;
    display: flex;
    padding: 12px;
    align-items: center;
    box-sizing: border-box;
    // justify-content: space-around;
    border-radius: 12px;
    .like_img{
      width: 80px;
    }
    .playlist_name{
      flex: 1;
      span{
        font-size: 14px;
        color: #666;
      }
      .name{
        font-size: 15px;
        color: #000;
      }
    }
    .like_icon{
      width: 40px;
      text-align: center;
    }

  }
      // 创建歌单样式
      .create_playlist{
        width: 92%;
        margin: 0 auto;
        background-color: #fff;
        padding: 12px;
        box-sizing: border-box;
        border-radius: 12px;
        .create_title{
          margin-bottom: 10px;
          span{
            font-size: 15px;
            color: #666;
          }
        }
        .playlist_list{
          .playlist_item{
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 15px;
            .playlist_desc{
              margin-left: 10px;
              .playlist_name{
                font-size: 18px;
                color: #000;
                margin-bottom: 10px;
              }
              .count{
                font-size: 14px;
                color: #666;
              }
            }
          }
        }
  }

  // 收藏歌单样式
  .collection_playlist{
        width: 92%;
        margin: 20px auto 0;
        background-color: #fff;
        padding: 12px;
        box-sizing: border-box;
        border-radius: 12px;
        .collection_title{
          margin-bottom: 10px;
          span{
            font-size: 15px;
            color: #666;
          }
        }
        .playlist_list{
          .playlist_item{
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 15px;
            .van-image{
              width: 80px;

            }
            .playlist_desc{
              flex: 1;
              margin-left: 10px;
              .playlist_name{
                font-size: 17px;
                color: #000;
                margin-bottom: 10px;
              }
              .count{
                font-size: 14px;
                color: #666;
              }
            }
          }
        }
  }
}
.van-tab {
  font-size: 18px;
}
</style>
