<template>
  <div class="rankSinger">
    <!-- 标题区域 -->
    <div class="title">
      <h6>歌手榜</h6>
      <router-link to="" class="more">更多</router-link>
    </div>

    <!-- Tab排行榜区域 -->
    <van-tabs v-model="activeName" class="Tabs" >
    <van-tab title="中国" name="China">
      <div class="rank">
        <div class="rankItem"
         v-for="(item,index) in chinaSinger"
          :key="item.index"
           @click="toSingerDetail(item.id)">
          <!-- 排名 -->
          <div class="rankNum">{{ index + 1 }}</div>
          <!-- 图片 -->
          <van-image
           class="rankImg"
           fit="cover"
           :src="item.picUrl"
           />
          <!-- 歌手信息 -->
          <div class="rankInfo">
            <div class="name">{{item.name}}</div>
            <div class="hot">
              <van-icon name="fire-o" class="icon" />
              <span>{{item.score}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="欧美" name="America">
      <div class="rank">
        <div class="rankItem" v-for="(item,index) in AmericaSinger" :key="item.index" @click="toSingerDetail(item.id)">
          <!-- 排名 -->
          <div class="rankNum">{{ index + 1 }}</div>
          <!-- 图片 -->
          <van-image
           class="rankImg"
           fit="cover"
           :src="item.picUrl"
           />
          <!-- 歌手信息 -->
          <div class="rankInfo">
            <div class="name">{{item.name}}</div>
            <div class="hot">
              <van-icon name="fire-o" class="icon" />
              <span>{{item.score}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="韩国" name="Korea">
            <div class="rank">
        <div class="rankItem" v-for="(item,index) in KoreaSinger" :key="item.index" @click="toSingerDetail(item.id)">
          <!-- 排名 -->
          <div class="rankNum">{{ index + 1 }}</div>
          <!-- 图片 -->
          <van-image
           class="rankImg"
           fit="cover"
           :src="item.picUrl"
           />
          <!-- 歌手信息 -->
          <div class="rankInfo">
            <div class="name">{{item.name}}</div>
            <div class="hot">
              <van-icon name="fire-o" class="icon" />
              <span>{{item.score}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="日本" name="Japan">
      <div class="rank">
        <div class="rankItem" v-for="(item,index) in JapanSinger" :key="item.index" @click="toSingerDetail(item.id)">
          <!-- 排名 -->
          <div class="rankNum">{{ index + 1 }}</div>
          <!-- 图片 -->
          <van-image
           class="rankImg"
           fit="cover"
           :src="item.picUrl"
           />
          <!-- 歌手信息 -->
          <div class="rankInfo">
            <div class="name">{{item.name}}</div>
            <div class="hot">
              <van-icon name="fire-o" class="icon" />
              <span>{{item.score}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getRankAPI } from '@/api/index.js'
export default {
  data () {
    return {
      activeName: 'China',
      chinaSinger: [],
      AmericaSinger: [],
      KoreaSinger: [],
      JapanSinger: []
    }
  },
  methods: {
    // 获取中国歌手数据
    async getChinaSinger () {
      const data = await getRankAPI(7)
      // console.log(data)
      if (data.data.code === 200) {
        this.chinaSinger = data.data.artists
      }
    },
    // 获取欧美歌手数据
    async getAmericaSinger () {
      const data = await getRankAPI(96)
      if (data.data.code === 200) {
        this.AmericaSinger = data.data.artists
      }
    },
    // 获取韩国歌手数据
    async getKoreaSinger () {
      const data = await getRankAPI(16)
      if (data.data.code === 200) {
        this.KoreaSinger = data.data.artists
      }
    },
    // 获取日本歌手数据
    async getJapanSinger () {
      const data = await getRankAPI(8)
      if (data.data.code === 200) {
        this.JapanSinger = data.data.artists
      }
    },
    toSingerDetail (singerid) {
      this.$router.push({
        path: '/singerdetail',
        query: { singerid }
      })
    }
    // 评论
  },
  created () {
    this.getChinaSinger()
    this.getAmericaSinger()
    this.getKoreaSinger()
    this.getJapanSinger()
  }
}
</script>

<style lang="less" scoped>
.rankSinger{
  margin-top: 20px;
  margin-bottom: 50px;
  background-color: #fff;
  .title{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    h6{
      font-size: 14px;
    }
    .more{
      height: 16px;
      width: 46px;
      font-size: 10px;
      border: 1px solid #717171;
      border-radius: 10px;
      text-align: center;
      line-height: 16px;
    }
  }

  .Tabs{
    font-size: 14px;
    .rank{
      padding-bottom: 60px;
      .rankItem{
        margin-bottom: 10px;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .rankNum{
          margin-left: 10px;
          width: 30px;
          font-size: 25px;
          color: #000;
        }
         &:nth-of-type(-n + 3) {
          .rankNum {
            color: crimson;
          }
        }
        .rankImg{
          margin-left: 10px;
          width: 60px;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;
        }
        .rankInfo{
          margin-left: 10px;
          width: 250px;
          .name{
            font-size: 20px;
            font-weight: 500;
          }
          .hot{
            color: #999;
          }
        }
      }
    }
  }
}
</style>
