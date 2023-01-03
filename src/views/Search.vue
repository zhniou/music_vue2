<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
     v-model="searchValue"
     clearable
     autofocus
     hight="46px"
     show-action
     :placeholder="keyWord.showKeyword"
     background="#ec4141"
     shape="round"
     clear-trigger
     @search="goSearchContent(searchValue)"
     @input="SearchMsgBoxAndContentShow"
   >
   <template #action>
    <!-- <div @click="goSearchContent(searchValue)">搜索</div> -->
    <div @click="back">返回</div>
   </template>
   </van-search>

   <router-view :key="$route.fullPath"></router-view>

    <transition name="van-fade">
      <div v-show="isShowMsgBox" class="searchMsgBox">
        <div
          class="searchtitle van-ellipsis"
          @click="toSuggestSearch(searchValue)"
        >
          搜索 “{{ searchValue }}”
        </div>
        <div
          class="searchItem">
          <div class="search_artist"
           v-for="item in searchSuggest.artists"
          :key="item.id"
          @click="toSuggestSearch(item.name)"
          >
            <van-icon name="search" class="sIcon" />
            <span class="ellipsis1">{{ item.name }}</span>
          </div>
          <div class="search_songs"
          v-for="(item, index) in searchSuggest.songs"
          :key="index"
          @click="toSuggestSearch(item.name)"
          >
            <van-icon name="search" class="sIcon" />
            <span class="ellipsis1" v-for="ar in item.artists" :key="ar.id">{{ar.name}}  {{ item.name }}</span>
          </div>
          <div class="search_playlist"
          v-for="item in searchSuggest.playlists"
          :key="item.id"
          @click="toSuggestSearch(item.name)"
          >
            <van-icon name="search" class="sIcon" />
            <span class="ellipsis1">{{ item.name }}</span>
          </div>
        </div>

      </div>
    </transition>

    <!-- 底部导航 -->
    <TarBar></TarBar>
  </div>
</template>

<script>
import TarBar from '@/components/TarBar'
import { searchWordsApi, getSuggestSearchApi } from '@/api/search.js'
export default {
  data () {
    return {
      searchValue: '',
      // 搜索关键字
      keyWord: '',
      // 热搜列表
      hotList: [],
      isShowMsgBox: false,
      searchSuggest: []
    }
  },
  components: {
    TarBar
    // SearchContent
  },
  methods: {
    // 获取默认关键字
    async getSearch () {
      const { data: res } = await searchWordsApi()
      if (res.code === 200) {
        this.keyWord = res.data
      }
    },
    // 获取推荐搜索内容
    async getSuggestSearch (keywords) {
      if (keywords === '') return
      const { data } = await getSuggestSearchApi(keywords)
      if (data.code === 200) this.searchSuggest = data.result
      console.log(this.searchSuggest)
    },
    back () {
      if (this.$route.fullPath !== 'search/hotsearch') {
        this.$router.push('/search')
        this.searchValue = ''
      } else {
        this.$router.push('/search')
      }
    },
    // 跳转到搜索结果页面
    toSearch (searchkey) {
      this.$router.push({
        path: '/search/searchConent',
        query: { searchkey }
      })
    },
    // 搜索
    goSearchContent (searchValue) {
      if (searchValue === '') {
        this.toSearch(this.keyWord.realkeyword)
      } else {
        this.toSearch(this.searchValue)
      }
      this.isShowMsgBox = false
    },
    // 控制搜索框的显示和隐藏
    SearchMsgBoxAndContentShow () {
      if (this.searchValue !== '') {
        this.isShowMsgBox = true
      } else {
        this.isShowMsgBox = false
      }
      // 获取推荐搜索
      this.getSuggestSearch(this.searchValue)
    },
    toSuggestSearch (val) {
      console.log(this.$route)
      if (this.$route.fullPath === 'search/hotsearch') {
        this.$router.go(0)
      }
      this.toSearch(val)
      this.searchValue = val
      this.isShowMsgBox = false
    }
  },
  created () {
    this.getSearch()
  }
}
</script>

<style lang="less" scoped>
.search{
  background-color: #f1f3f4;
  font-size: 14px;
  span{
    margin: 10px;
  }
    .searchMsgBox {
    width: 90%;
    background-color: #fff;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 6px 2px #ccc;
    font-size: 13px;
    box-sizing: border-box;
    z-index: 2;
    .searchtitle {
      height: 46px;
      line-height: 46px;
      color: #5383e8;
      border-bottom: 1px solid #d6d6d6;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .searchItem {
      .search_artist{
          height: 46px;
          width: 100%;
          display: flex;
          align-items: center;
          color: #939399;
          border-bottom: 1px solid #d6d6d6;
          padding: 0 10px;
          box-sizing: border-box;
         .sIcon {
           font-size: 20px;
           margin-right: 4px;
         }
      }
       .search_songs{
          height: 46px;
          width: 100%;
          display: flex;
          align-items: center;
          color: #939399;
          border-bottom: 1px solid #d6d6d6;
          padding: 0 10px;
          box-sizing: border-box;
         .sIcon {
           font-size: 20px;
           margin-right: 4px;
         }
      }
      .search_playlist{
          height: 46px;
          width: 100%;
          display: flex;
          align-items: center;
          color: #939399;
          border-bottom: 1px solid #d6d6d6;
          padding: 0 10px;
          box-sizing: border-box;
         .sIcon {
           font-size: 20px;
           margin-right: 4px;
         }
      }
    }
  }
}

</style>
