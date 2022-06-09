<template>
  <div class="search_container">

    <!-- 标签页 -->
    <van-tabs v-model="active" swipeable>
      <van-tab title="综合" name="all">
        <Composited></Composited>
      </van-tab>
      <van-tab title="单曲">
        <SongDetail></SongDetail>
      </van-tab>
      <van-tab title="歌单">
        <PlaylistSearch></PlaylistSearch>
      </van-tab>
      <van-tab title="专辑">
        <AlbumSearch></AlbumSearch>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Composited from '@/components/search/Composited'
import SongDetail from '@/components/search/SongDetail'
import PlaylistSearch from '@/components/search/PlayListSearch'
import AlbumSearch from '@/components/search/AlbumSearch'
export default {
  data () {
    return {
      searchValue: '',
      active: 'all'
    }
  },
  components: {
    Composited,
    SongDetail,
    PlaylistSearch,
    AlbumSearch
  },
  methods: {
    back () {
      this.$router.back()
    },
    hh () {
      // console.log(this.$route.query)
    }

  },
  created () {
    this.hh()
  }
}
</script>

<style lang="less" scope>
.search_container{
  background-color: #f1f2f3;
}
</style>
