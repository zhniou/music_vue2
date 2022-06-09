<template>
  <div>
    <van-swipe :autoplay="3000" class="swiper">

    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" class="img" />
    </van-swipe-item>

  </van-swipe>
  </div>
</template>

<script>
import { getSwipeAPI } from '@/api/index.js'
export default {
  data () {
    return {
      images: []
    }
  },
  methods: {
    async getSwipe () {
      const { data: res } = await getSwipeAPI()
      if (res.code === 200) {
        for (let i = 0; i < res.banners.length; i++) {
          this.images.push(res.banners[i].pic)
        }
      }
    }
  },
  mounted () {
    this.getSwipe()
  }
}
</script>

<style lang="less" scoped>
.swiper {
  // height: 150px;
  margin-top: 0;
  .img {
    width: 375px;
    height: 146px;
    display: block;
  }
}
</style>
