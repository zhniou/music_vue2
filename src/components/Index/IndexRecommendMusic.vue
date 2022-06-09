<template>
  <div class="recommendMusic">
    <!-- 标题栏 -->
    <div class="title">
      <h6>推荐歌单</h6>
      <router-link class="more"  to="/playlist">更多</router-link>
    </div>

    <!-- 歌单列表 -->
    <div class="songList">
      <!-- 图片区域 -->
      <div class="songItem" v-for="item in recSonList" :key="item.id" @click="toPlayListDetail(item.id)">
          <van-image
          class="song_img"
          fit="contain"
          :src="item.picUrl"
        />
        <!-- 文字区域 -->
        <div class="song_text van-multi-ellipsis--l2">{{item.name}}</div>
        <div class="song-count">▶{{ item.playCount|formatNumber}}</div>

    </div>
  </div>
  </div>
</template>

<script>
import { getRecommendMusicAPI } from '@/api/index.js'
export default {
  data () {
    return {
      recSonList: {},
      playlistDetailList: {}
    }
  },
  methods: {
    // 跳转歌单详情页
    toPlayListDetail (playlistid) {
      this.$router.push({
        path: '/playlistdetail',
        query: { playlistid }
      })
    },
    // 获取推荐歌单列表
    async getRecomPlayList () {
      const { data } = await getRecommendMusicAPI(8)
      if (data.code === 200) {
        for (let i = 0; i < data.result.length; i++) {
          this.recSonList[data.result[i].id] = data.result[i]
        }
        // console.log(this.recSonList)
      }
      this.$forceUpdate() // 解决F5刷新后v-for不渲染的问题，bug原因不明
    }
  },
  created () {
    this.getRecomPlayList()
  }
}
</script>

<style lang="less" scoped>
.recommendMusic{
  .title{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    h6{
    margin-top: 5px;
  }
   .more{
      font-size: 12px;
      text-align: center;
      height: 20px;
      width: 46px;
      color: #666;
      line-height: 20px;
      border: 1px solid #717171;
      border-radius: 10px;
    }
  }
}

.songList{
   width: 100%;
    height: 300px;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  .songItem{
     position: relative;
   margin: 10px 0 0;
   width: 80px;
   height: 120px;
    .song_img{
      width: 80px;
      height: 80px;
      border-radius: 10px;
      overflow: hidden;
      background-color: aquamarine;
      opacity: 0.8;
    }
    .song_text{
      margin-top: 5px;
      font-size: 11px;
      width: 80px;
      text-align: center;
    }
    .song-count{
       position: absolute;
        color: #fff;
        font-size: 10px;
        top: 4px;
        right: 4px;
        height: 16px;
        line-height: 16px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 20px;
        padding: 0 6px;
    }
  }
}
</style>
