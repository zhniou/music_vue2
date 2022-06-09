<template>
  <div class="comment_container">
    <!-- 导航栏 -->
     <van-nav-bar
        title="评论"
        left-text="返回"
        left-arrow
        @click-left.stop="closePopup"
      />

      <!-- 热评 -->
      <div class="comment_list">
        <div class="comment_title">
          热评
        </div>
        <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
           @load="getPlaylistComment"
         >
         <div class="comment_item" v-for="hot in hotCommentData" :key="hot.commentId">
           <div class="img">
             <van-image
              width="40px"
              height="40px"
              fit="contain"
              round
              v-if="hot.user"
              :src="hot.user.avatarUrl"
            />
           </div>
           <div class="desc">
             <div class="creator_nickname" v-if="hot.user">{{hot.user.nickname}}</div>
             <div class="create_time">{{hot.timeStr}}</div>
             <div class="content">{{hot.content}}</div>
           </div>
         </div>
      </van-list>
      </div>

      <!-- 评论 -->
      <div class="comment_list">
        <div class="comment_title">
          评论
        </div>
        <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
           @load="getPlaylistComment"
         >
         <div class="comment_item" v-for="hot in commentData" :key="hot.commentId">
           <div class="img">
             <van-image
              width="40px"
              height="40px"
              fit="contain"
              round
              v-if="hot.user"
              :src="hot.user.avatarUrl"
            />
           </div>
           <div class="desc">
             <div class="creator_nickname" v-if="hot.user">{{hot.user.nickname}}</div>
             <div class="create_time">{{hot.timeStr}}</div>
             <div class="content">{{hot.content}}</div>
           </div>
         </div>
      </van-list>
      </div>
  </div>
</template>

<script>
import { playlistCommentApi } from '@/api/comment.js'
export default {
  data () {
    return {
      isShowPopup: this.showPopup,
      commentData: {},
      hotCommentData: {},
      loading: false,
      finished: false,
      page: 0,
      offset: 0
    }
  },
  props: ['showPopup', 'playListId'],
  methods: {
    closePopup () {
      this.isShowPopup = false
      this.$emit('closeShowPopup', this.isShowPopup)
    },
    async getPlaylistComment () {
      this.offset = (this.page - 1) * 20
      const { data: res } = await playlistCommentApi(this.playListId)
      console.log(res)
      if (res.code === 200) {
        this.commentData = res.comments
        this.hotCommentData = res.hotComments
      }
      this.loading = false
      this.finished = true
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.comment_container{
  .comment_list{
    .comment_title{
      margin: 10px;
    }
    .comment_item{
      display: flex;
      padding: 10px;
      .img{
        margin:5px 10px 0 0;
      }
      .desc{
        .creator_nickname{
          font-size: 16px;
          color: #666;
          margin: 7px 0 0;
        }
        .create_time{
          font-size: 14px;
          color: #ccc;
          margin: 5px 0;
        }
        .content{
          font-size: 16px;
          color: #000;
        }
      }
    }
  }
}
</style>
