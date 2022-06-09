<template>
  <div id="song">
    <div class="title">
      <van-icon name="play-circle" class="pc_icon" />
      播放全部
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="getSongsSearch"
      finished-text="没有更多了"
    >
      <div
        class="song_item"
        v-for="(song, index) in songs"
        :key="index"
        @click="playThisMusic(item,index)"
      >
        <div class="songinfo" >
          <div class="s_name van-ellipsis">
            {{ song.name }}
            <span class="second_name" v-if="song.transNames">
              ({{ song.transNames[0] }})
            </span>
          </div>
          <div class="s_by van-ellipsis">
            <span v-for="(ar, index) in song.artists" :key="index">
              <span v-if="index === song.artists.length - 1">
                {{ ar.name }}
              </span>
              <span v-else>{{ ar.name }} / </span>
            </span>
            -
            {{ song.album.name }}
          </div>
          <div class="s_alias van-ellipsis" v-if="song.alias">
            {{ song.alias[0] }}
          </div>
        </div>
        <van-icon class-prefix="my-icon" class="s_icon" name="col_ellipsis" />
      </div>
    </van-list>
  </div>
</template>

<script>
import { searchApi } from '@/api/search.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      songs: [],
      finished: false,
      loading: false,
      page: 0,
      offset: 0
    }
  },
  methods: {
    // 获取歌曲数据
    async getSongsSearch () {
      this.page++
      this.offset = (this.page - 1) * 30
      const { data } = await searchApi(this.$route.query.searchkey, 1, this.offset)
      console.log(data)
      if (data.code === 200) {
        for (let i = 0; i < data.result.songs.length; i++) {
          this.songs.push(data.result.songs[i])
        }
        this.loading = false
        if (data.result.songs.length < 30) this.finished = true
      } else {
        console.log(data)
      }
    },
    // 播放当前选择的歌曲
    playThisMusic (item, index) {
      item = this.songs
      console.log(item)
      this.selectPlay({
        item,
        index
      })
    },
    ...mapActions(['selectPlay'])

  },
  created () {
    this.getSongsSearch()
  }
}
</script>

<style lang="less" scoped>
#song {
  width: 100%;
  background-color: #fff;
  height: 520px;
  overflow: scroll;
  .title {
    background-color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    position: sticky;
    top: 0px;
    .pc_icon {
      color: #4080d0;
      font-size: 16px;
      margin: 0 6px 0 10px;
    }
  }
  .song_item {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 12px;
    margin-bottom: 4px;
    box-sizing: border-box;
    .songinfo {
      width: 320px;
      font-size: 16px;
      .second_name {
        color: #969799;
        padding-left: 4px;
      }
      .s_by {
        margin-top: 6px;
        font-size: 12px;
        color: #969799;
      }
      .s_alias {
        margin-top: 2px;
        font-size: 14px;
        color: #969799;
      }
    }
    .s_icon {
      font-size: 16px;
      color: #939393;
    }
  }
}
</style>
