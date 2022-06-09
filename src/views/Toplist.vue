<template>
  <div class="ranking_container">
    <!-- 导航栏 -->
    <van-nav-bar
     title="排行榜"
     left-text="返回"
     left-arrow
     fixed
     @click-left="back"
     />

     <!-- 排行榜单 -->
     <van-tabs v-model="active" scrollspy sticky>
      <van-tab title="官方榜"  name="official">
        <div class="ranking_list">
          <h5>官方榜</h5>
          <div class="ranking_item" v-for="item in officialList" :key="item.id" @click="goPlaylistDetail(item.id)">
            <div class="left">
              <div class="title">{{item.name}}</div>
              <van-image
              width="80px"
              height="80px"
              radius="10px"
              :src="item.coverImgUrl"
              ></van-image>
            </div>

            <div class="right">
              <div class="item_song" v-for="song in item.tracks" :key="song.first">
                <span class="ellipsis1">{{song.first}}<span class="singer"> - {{song.second}}</span></span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="云音乐榜单" name="cloud">
        <div class="ranking_block">
          <h5>云音乐榜单</h5>
          <van-grid :border="false" :column-num="3" >
            <van-grid-item v-for="item in cloudList" :key="item.id" text="文字" @click="goPlaylistDetail(item.id)">
              <van-image
              radius="7px"
              width="70px"
              height="70px"
              :src="item.coverImgUrl" />
              <div class="playlist_name ellipsis1">
                {{item.name}}
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
      <van-tab title="其他" name="other">
        <div class="ranking_block">
          <h5>其他</h5>
          <van-grid :border="false" :column-num="3" >
            <van-grid-item v-for="item in otherList" :key="item.id" text="文字" @click="goPlaylistDetail(item.id)">
              <van-image
              radius="7px"
              width="70px"
              height="70px"
              :src="item.coverImgUrl" />
              <div class="playlist_name ellipsis1">
                {{item.name}}
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { topListApi } from '@/api/toplist.js'
export default {
  data () {
    return {
      officialList: [],
      cloudList: [],
      otherList: [],
      active: 'official'
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    // 获取排行榜数据
    async getTopList () {
      const { data } = await topListApi()
      if (data.code === 200) {
        // console.log(data)
        for (let i = 0; i < data.list.length; i++) {
          if (data.list[i].ToplistType) {
            // 官方榜
            this.officialList.push(data.list[i])
          } else if (data.list[i].userId === 1) {
            this.cloudList.push(data.list[i])
          } else {
            this.otherList.push(data.list[i])
          }
        }
      }
      // console.log(this.officialList)
      // console.log(this.otherList)
      // console.log(this.cloudList)
    },
    goPlaylistDetail (playlistid) {
      this.$router.push({
        path: '/playlistdetail',
        query: { playlistid }
      })
    }
  },
  created () {
    this.getTopList()
  }
}
</script>

<style lang="less" scoped>
.ranking_container{
  padding-top: 46px;
  background-color: #f1f2f3;
  .ranking_list{
    width: 92%;
    margin:20px auto 20px;
    background-color: #fff;
    padding: 10px;
    border-radius: 12px;
    .ranking_item{
      display: flex;
      margin: 20px 0;
      align-items: center;
      .left{
        margin-right: 20px;
        text-align: center;
        .title{
          margin-bottom: 10px;
        }
      }
      .right{
        .item_song{
          margin-top: 15px;
          span{
            font-size: 16px;
            color: #000;
            .singer{
              font-size: 16px;
              color: #666;
            }
          }
        }
      }
    }
  }
  .ranking_block{
    width: 92%;
    margin:20px auto 20px;
    background-color: #fff;
    border-radius: 12px;
    padding: 10px;
      .van-grid{
        .van-grid-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 15px;
        .playlist_name{
          font-size: 15px;
          margin-top: 5px;
        }
      }
      }
    }
}
/deep/.van-tab{
  font-size: 17px;
}
</style>
