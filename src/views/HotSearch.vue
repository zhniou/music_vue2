<template>
  <div>
    <!-- 热搜列表 -->
   <div class="hot_list">
     <div class="hot_item" v-for="(item,index) in hotList" :key="item.index" @click="goSearchResult(item)">
       <div :class="[index<3?'top_index':'index']"><span>{{index+1}}</span></div>
       <div :class="[index<3?'top_name':'hot_name','ellipsis1']">{{item}}</div>
     </div>
   </div>
  </div>
</template>
<script>
import { hotSearchApi } from '@/api/search.js'
export default {
  data () {
    return {
      hotList: []
    }
  },
  methods: {
    async getHotList () {
      // 热搜列表
      const { data } = await hotSearchApi()
      if (data.code === 200) {
        data.result.hots.forEach(item => {
          this.hotList.push(item.first)
        })
      }
    },
    goSearchResult (searchkey) {
      this.$router.push({
        path: '/search/searchConent',
        query: { searchkey }
      })
    }
  },
  created () {
    this.getHotList()
  }
}
</script>

<style lang="less" scope>
  .hot_list{
    width: 92%;
    border-radius: 10px;
    margin: 20px auto 0;
    background-color: #fff;
    padding:20px 10px ;
     .hot_item{
        width: 100%;
        // height: 30px;
        padding: 5px 0;
        display: flex;
        .index{
          display: inline-block;
          font-size: 18px;
          color: #666;
          font-weight: 550;
          margin-right: 10px;
        }
        .hot_name{
          display: inline-block;
          font-size: 18px;
          color: #333;
        }
      }
    }

// 热搜前三样式
.top_index{
  display: inline-block;
  font-size: 18px;
  color: #ec4141;
  font-weight: 550;
  margin-right: 10px;
}
.top_name{
  display: inline-block;
   font-size: 18px;
  color: #000;
  font-weight: 550;
}
</style>
