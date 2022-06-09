<template>
  <div class="index">
     <!-- 头部组件 -->
    <van-nav-bar fixed placeholder  :border="false" class="navbar">
      <template #left>
        <van-icon
          class-prefix="my-icon"
          name="meau"
          class="menuicon"
          size="25"
           @click="showPopup"
        />
      </template>
      <template #title> WX Music </template>
      <template #right>
        <van-icon
          size="25"
          name="search"
          class="icon searchicon"
          @click="goSearch"
        />
      </template>
    </van-nav-bar>

    <!-- 轮播图区域 -->
    <keep-alive>
    <IndexSwiper></IndexSwiper>
    </keep-alive>

    <!-- 功能栏组件 -->
    <keep-alive>
    <IndexFunction></IndexFunction>
    </keep-alive>

    <!-- 推荐歌单 -->
    <keep-alive>
    <IndexRecommendMUsic></IndexRecommendMUsic>
    </keep-alive>

    <!-- 歌手排行组件 -->
    <keep-alive>
    <IndexSinkBySinger></IndexSinkBySinger>
    </keep-alive>

    <!-- 底部导航 -->
    <keep-alive>
    <TarBar></TarBar>
    </keep-alive>

    <!-- 弹出层 -->
    <keep-alive>
    <SideBar ref="popup"></SideBar>
    </keep-alive>

  </div>
</template>

<script>
import IndexSwiper from '@/components/Index/IndexSwipe'
import IndexFunction from '@/components/Index/IndexFunction'
import IndexRecommendMUsic from '@/components/Index/IndexRecommendMusic'
import IndexSinkBySinger from '@/components/Index/IndexRankBySinger'
import TarBar from '@/components/TarBar'
import SideBar from '@/components/SideBar'
export default {
  components: {
    IndexSwiper,
    IndexFunction,
    IndexRecommendMUsic,
    IndexSinkBySinger,
    TarBar,
    SideBar
  },
  data () {
    return {

    }
  },
  methods: {
    showPopup () {
      this.$refs.popup.popupShow = true
    },
    goSearch () {
      this.$router.push('/search')
    },
    fresh () {
      this.$router.go(0)
    }
  },
  created () {
    // this.fresh()
  }
}
</script>

<style lang="less" scoped>
.menuicon{
  color: #fff;
}
.index{
  background-color: #f1f3f4;
  // padding-bottom: 40px;
}
.navbar{
  height: 46px;
}
.van-nav-bar__placeholder{
  height: 46px;
}
</style>
