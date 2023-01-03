<template>
  <div class="composited_container">
    <!-- 单曲 -->
    <div class="list_div">
      <div class="s_title">单曲</div>
      <van-empty
        image="error"
        description="暂无相关的任何单曲"
        v-if="!song.songs"
      />
      <div class="song_list">
        <div class="s_item" v-for="(item,index) in song.songs" :key="item.id" @click="playThisMusic(item,index)">
          <div class="s_info">
            <div class="s_name">{{item.name}}</div>
            <div class="artist_info ellipsis1"><span v-for="ar in item.ar" :key="ar.id"> {{ar.name}}- <span>{{item.al.name}}</span></span></div>
          </div>
          <div class="s_operation">
            <!-- mv -->
            <!-- <van-icon class-prefix="my-icon"  name="mv" size="20px" v-if="!item.mv" /> -->
          </div>
        </div>
      </div>
      <div class="s_more" v-if="song.more">
        {{song.moreText}}
      </div>
    </div>

      <!-- 歌单 -->
    <div class="list_div">
    <div class="playList">
      <div class="s_title">歌单</div>
      <div class="p_list_item" v-for="item in playList.playLists" :key="item.id" @click="goPlaylistDetail(item.id)">
        <div class="playList_img">
          <van-image
            width="50px"
            height="50px"
            fit="cover"
            :src="item.coverImgUrl"
          />
        </div>
        <div class="playList_text">
          <div class="plt_name">{{item.name}}</div>
          <div class="plt_sm"><span class="ellipsis1">{{item.trackCount}} 首音乐  by {{item.creator.nickname}} 播放{{item.playCount|formatNumber}} 次</span></div>
        </div>
      </div>
      <div class="s_more" v-if="playList.more">
        {{playList.moreText}}
      </div>
    </div>
    </div>

    <!-- 专辑 -->
    <div class="list_div">
      <div class="album">
      <div class="s_title">专辑</div>
      <div class="album_list_item" v-for="item in album.albums" :key="item.id" >
        <div class="album_img">
          <van-image
            width="50px"
            height="50px"
            fit="cover"
            :src="item.picUrl"
          />
        </div>
        <div class="album_text">
          <div class="album_name">{{item.name}}</div>
          <div class="album_sm"><span class="ellipsis1">{{item.artist.name}}  {{item.publishTime|formatData}}</span></div>
        </div>
      </div>
      <div class="s_more" v-if="album.more">
        {{album.moreText}}
      </div>
    </div>
    </div>

     <!-- 歌手 -->
    <div class="list_div">
      <div class="artist">
      <div class="s_title">歌手</div>
      <div class="artist_list_item" v-for="item in artist.artists" :key="item.id" @click="toSingerDetail(item.id)">
        <div class="artist_img">
          <van-image
            width="50px"
            height="50px"
            fit="cover"
            :src="item.picUrl"
          />
        </div>
        <div class="artist_text">
          <div class="artist_name">{{item.name}}</div>
          <div class="artist_sm"><span class="ellipsis1"></span></div>
        </div>
      </div>
      <div class="s_more" v-if="artist.more">
        {{artist.moreText}}
      </div>
    </div>
    </div>

     <!-- 用户 -->
    <div class="list_div">
      <div class="user">
      <div class="s_title">用户</div>
      <div class="user_list_item" v-for="item in user.users" :key="item.id" >
        <div class="user_img">
          <van-image
            width="50px"
            height="50px"
            fit="cover"
            :src="item.avatarUrl"
          />
        </div>
        <div class="user_text">
          <div class="user_name">{{item.nickname}}</div>
          <div class="user_sm"><span class="ellipsis1"></span></div>
        </div>
      </div>
      <!-- <div class="s_more" v-if="user.more">
        {{user.moreText}}
      </div> -->
    </div>
    </div>

  </div>
</template>

<script>
import { searchApi } from '@/api/search.js'
import { mapActions } from 'vuex'
export default {
  props: ['keyword'],
  data () {
    return {
      song: {},
      album: {},
      playList: {},
      artist: {},
      user: {},
      video: {}
    }
  },
  methods: {
    async getCompositeData () {
      // 将查询参数转化为字符串
      const keyword = JSON.stringify(this.$route.query.searchkey)
      const { data: res } = await searchApi(keyword, 1018)
      if (res.code === 200) {
        const data = res.result
        if (data.song) this.song = data.song
        if (data.album) this.album = data.album
        if (data.playList) this.playList = data.playList
        if (data.artist) this.artist = data.artist
        if (data.user) this.user = data.user
        if (data.video) this.video = data.video
        // console.log(this.video)
      } else {
        console.log(res)
      }
    },
    goPlaylistDetail (playlistid) {
      this.$router.push({
        path: '/playlistdetail',
        query: { playlistid }
      })
    },
    // 播放当前选择的歌曲
    playThisMusic (item, index) {
      item = this.song.songs
      this.selectPlay({
        item,
        index
      })
    },
    ...mapActions(['selectPlay']),
    toSingerDetail (singerid) {
      this.$router.push({
        path: '/singerdetail',
        query: { singerid }
      })
    }
  },
  created () {
    this.getCompositeData()
  }
}
</script>

<style lang="less" scope>
.composited_container {
  height: calc(100% -  55px);
  overflow: scroll;
  margin-bottom: 50px;
  // 单曲
  .list_div {
    width: 92%;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
    // 单曲
    .song_list{
      .s_item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:10px 15px;
        .s_info{
          .s_name{
            font-size: 16px;
            color: #000;
            margin: 5px 0;
          }
          .artist_info{
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
     // 歌单
   .playList {
    width: 92%;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
    .p_list_item {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        .playList_img {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          overflow: hidden;
        }
        .playList_text {
          width: 240px;
          margin-left: 12px;
          .plt_name {
            font-size: 13px;
          }
          .plt_sm {
            margin-top: 4px;
            color: #757575;
            font-size: 13px;
          }
        }
    }
    .s_more {
      font-size: 15px;
      text-align: center;
      color: #a4a2a2;
      border-top: 1px solid #e9e9e9;
      height: 44px;
      line-height: 44px;
    }
  }
    // 专辑
   .album {
    width: 92%;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
    .album_list_item {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        .album_img {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          overflow: hidden;
        }
        .album_text {
          width: 240px;
          margin-left: 12px;
          .album_name {
            font-size: 13px;
          }
          .album_sm {
            margin-top: 4px;
            color: #757575;
            font-size: 13px;
          }
        }
    }
    .s_more {
      font-size: 15px;
      text-align: center;
      color: #a4a2a2;
      border-top: 1px solid #e9e9e9;
      height: 44px;
      line-height: 44px;
    }
  }

  // 歌手
   .artist {
    width: 92%;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
    .artist_list_item {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        .artist_img {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          overflow: hidden;
        }
        .artist_text {
          width: 240px;
          margin-left: 12px;
          .artist_name {
            font-size: 13px;
          }
          .artist_sm {
            margin-top: 4px;
            color: #757575;
            font-size: 13px;
          }
        }
    }
    .s_more {
      font-size: 15px;
      text-align: center;
      color: #a4a2a2;
      border-top: 1px solid #e9e9e9;
      height: 44px;
      line-height: 44px;
    }
  }

   // 用户
   .user {
    width: 92%;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
    .user_list_item {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        .user_img {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          overflow: hidden;
        }
        .user_text {
          width: 240px;
          margin-left: 12px;
          .user_name {
            font-size: 13px;
          }
          .user_sm {
            margin-top: 4px;
            color: #757575;
            font-size: 13px;
          }
        }
    }
    .s_more {
      font-size: 15px;
      text-align: center;
      color: #a4a2a2;
      border-top: 1px solid #e9e9e9;
      height: 44px;
      line-height: 44px;
    }
  }
    .s_more {
      font-size: 15px;
      text-align: center;
      color: #a4a2a2;
      border-top: 1px solid #e9e9e9;
      height: 44px;
      line-height: 44px;
    }

  }

}

 .s_title {
   font-size: 17px;
   height: 42px;
   line-height: 42px;
   padding-left: 20px;
   letter-spacing: 5px;
   font-weight: 500;
   border-bottom: 1px solid #e9e9e9;
 }
</style>
