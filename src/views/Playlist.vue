<template>
  <div>
   <!-- 导航栏 -->
   <van-nav-bar
    title="歌单广场"
    left-text="返回"
    left-arrow
    fixed
    @click-left="back"
    />

    <!-- 操作栏 -->
    <div class="operation">
      <span>全部</span>
      <div class="screening" @click="showPopup">
      <van-icon name="filter-o" class="icon"/>
        筛选
      </div>
    </div>

  <!-- 歌单列表 -->
  <div class="playlist">
    <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多了"
     @load="getPlaylist"
    >
    <div class="playlist_item">
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in playlists" :key="item.id" @click="toPlayListDetail(item.id)">
        <!-- 图片区域 -->
       <div class="img">
         <van-image width="100px" height="100px" radius='10px' :src="item.coverImgUrl" />
         <div class="num">
           <van-icon name="play-circle-o" color="#fff"/>{{item.playCount|formatNumber}}
         </div>
       </div>
        <!-- 文字描述 -->
        <div class="text ellipsis2">
          <p>{{item.name.trim()}}</p>
        </div>
      </van-grid-item>

    </van-grid>
    </div>
     </van-list>
  </div>

  <!-- 弹出层 -->
  <van-popup
  v-model="popupShow"
  closeable
  position="bottom"
  :style="{ height: '70%' }"
  class="popup">
  <div class="title">
    <span>所有精品歌单</span>
  </div>
  <div class="tags">
    <div class="top">
      <div class="all"><span>精选歌单</span></div>
    </div>
    <div class="bottom">
      <div class="item_tags">
       <span v-for="tag in Tags" :key="tag.id" class="van-ellipsis">{{tag.name}}</span>
      </div>
    </div>
  </div>
  </van-popup>
  </div>
</template>

<script>
import { playlistApi, playlistSortApi } from '@/api/playlist.js'
export default {
  data () {
    return {
      playlists: [],
      // 歌单分类
      Tags: [],
      popupShow: false,
      loading: false,
      finished: false,
      page: 0,
      offset: 0
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    // 获取歌单数据
    async getPlaylist () {
      this.offset = (this.page - 1) * 50
      const { data } = await playlistApi(50, this.offset)
      if (data.code === 200) {
        this.page++
        for (let i = 0; i < data.playlists.length; i++) {
          this.playlists.push(data.playlists[i])
        }
        this.loading = false
        if (data.playlists.length < 50) this.finished = true
      }
    },
    // 获取歌单分类
    async getPlaylistSort () {
      const { data: res } = await playlistSortApi()
      if (res.code === 200) {
        this.Tags = res.sub
      }
    },
    showPopup () {
      this.popupShow = true
    },
    // 跳转歌单详情页
    toPlayListDetail (playlistid) {
      this.$router.push({
        path: '/playlistdetail',
        query: { playlistid }
      })
    }
  },
  created () {
    // this.getPlaylist()
    this.getPlaylistSort()
  }
}
</script>

<style lang="less" scoped>
.playlist{
  background-color: #f1f3f4;
  .playlist_item{
    box-sizing: border-box;
    .img{
      width: 100px;
      height: 100px;
      position: relative;
      .num{
        position: absolute;
        top: 5px;
        right: 10px;
        color: #fff;
        font-size: 14px;
        text-align:center;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 7px;
      }
    }
    .text{
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.operation{
  margin-top: 46px;
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  padding: 7px;
}

.popup{
  .title{
    text-align: center;
    font-size: 22px;
    margin: 5px 0;
  }
  .tags{
    text-align: center;
    .top{
      .all{
        margin: 10px;
        span{
         background-color: #eee;
         border-radius: 10px;
         font-size: 19px;
        }
      }
    }
  }
  .bottom{
    .item_tags{
      margin: 8px;
      span{
        background-color: #ddd;
        font-size: 18px;
        border-radius: 8px;
        display: inline-block;
        width: 80px;
        margin: 10px 10px;
      }
    }
  }
}
// /deep/.van-grid-item__content {
//   padding: 0;
// }
</style>
