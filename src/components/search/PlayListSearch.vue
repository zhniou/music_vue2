<template>
  <div id="playlist">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getPlaylistsSearch"
    >
      <div
        class="playlist_item"
        v-for="(playlist, index) in playlists"
        :key="index"
        @click="goPlayListDetail(playlist.id)"
      >
        <van-image class="i_pic" :src="playlist.coverImgUrl" />
        <div class="i_info">
          <div class="name van-ellipsis">
            {{ playlist.name }}
          </div>
          <div class="count van-ellipsis">
            {{ playlist.trackCount }}首
            <span v-if="playlist.creator">
              by {{ playlist.creator.nickname }}
            </span>
            播放{{ playlist.playCount | formatNumber }}次
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { searchApi } from '@/api/search.js'
export default {
  data () {
    return {
      playlists: [],
      finished: false,
      loading: false,
      page: 0,
      offset: 0
    }
  },
  methods: {
    // 获取歌单信息
    async getPlaylistsSearch () {
      this.page++
      this.offset = (this.page - 1) * 30
      const { data } = await searchApi(this.$route.query.searchkey, 1000, this.offset)
      if (data.code === 200) {
        for (let i = 0; i < data.result.playlists.length; i++) {
          this.playlists.push(data.result.playlists[i])
        }
        this.loading = false
        if (data.result.playlists.length < 30) this.finished = true
      } else {
        console.log(data)
      }
    },
    // 歌单详情页
    goPlayListDetail (playlistid) {
      this.$router.push({
        path: '/playlistdetail',
        query: { playlistid }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#playlist {
  width: 100%;
  background-color: #fff;
  height: 520px;
  overflow: scroll;
  .playlist_item {
    // height: 60px;
    padding: 8px;
    display: flex;
    margin: 5px 0;
    align-items: center;
    justify-content: space-between;
    .i_pic {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      overflow: hidden;
    }
    .i_info {
      width: 300px;
      .name {
        font-size: 16px;
      }
      .count {
        margin-top: 3px;
        font-size: 12px;
        color: #969799;
      }
    }
  }
}
</style>
