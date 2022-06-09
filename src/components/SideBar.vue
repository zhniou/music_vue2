<template>
  <div>
    <van-popup v-model="popupShow" position="left" class="popup">
      <!-- 用户信息 -->
      <div class="userInfo">
        <!-- 头像 -->
        <div class="user_avatar">
          <img v-if="userLoginStatus" :src="userImg" alt="">
          <img v-else src="@/assets/images/logo.jpg" alt="">
        </div>
        <!-- 用户名 -->
        <div class="user_name">
          <span v-if="userLoginStatus">{{username}}</span>
          <router-link v-else :to="{ path: '/login' }" class="loginbtn">点击登录</router-link>
        </div>
      </div>

      <!-- 当前登录状态 -->
      <div class="user_status funList">
        <van-cell :title="'当前登录状态   '+loginStatusGetText"/>
      </div>

      <!-- 消息和创作中心 -->
      <div class="funList">
        <van-cell title="消息" icon-prefix="my-icon" icon="msg"/>
         <van-cell title="创作中心" icon-prefix="my-icon" icon="creator_center" />
      </div>

      <div class="funList">
        <van-cell title="音乐黑名单" icon-prefix="my-icon" icon="ban" is-link/>
         <van-cell title="青少年模式" icon-prefix="my-icon" icon="youth_model" is-link/>
         <van-cell title="我的订单" icon-prefix="my-icon" icon="order" is-link/>
         <van-cell title="优惠券" icon-prefix="my-icon" icon="coupon" is-link/>
         <van-cell title="音乐闹钟" icon-prefix="my-icon" icon="alarm_clock" is-link/>
      </div>

      <!-- 关于 -->
      <div class="funList">
        <van-cell title="关于" icon-prefix="my-icon" icon="about" is-link/>
      </div>

      <!-- 退出 -->
      <div class="funList" v-if="userLoginStatus">
        <van-cell title="退出登录" class="out" @click="loginout" v-show="userLoginStatus"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getLoginStatusApi, logoutApi } from '@/api/user.js'
export default {
  data () {
    return {
      userImg: '',
      username: '',
      popupShow: false,
      userLoginStatus: false,
      loginStatusGetText: ''
    }
  },
  methods: {
    async getLoginStatus () {
      // 获取登录信息
      const { data: status } = await getLoginStatusApi()
      if (status.data.profile != null) {
        this.userLoginStatus = true
        this.loginStatusGetText = '已登录'
        this.userImg = status.data.profile.avatarUrl
        this.username = status.data.profile.nickname
      } else {
        this.loginStatusGetText = '未登录'
      }
    },
    async loginout () {
      const { data } = await logoutApi()
      if (data.code === 200) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userinfo')
        // 刷新页面
        window.location.reload()
      } else {
        this.$msg.fail('退出登录失败！')
      }
    }
  },
  created () {
    this.getLoginStatus()
  }
}
</script>

<style lang="less" scoped>
.popup{
  height: 100%;
  width: 80%;
  background-color: #eee;
  .userInfo{
    margin-left: 20px;
    padding: 12px 0 0 16px;
    display: flex;
    align-items: center;
    .user_avatar{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid rgb(255, 145, 145);
      img{
      width: inherit;
      height: inherit;
      border-radius: 50%;
      }
    }
    .user_name{
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .user_status{
    background-color: #fff;
    span{
      font-size: 14px;
    }
  }
}
 .funList{
   width: 90%;
   border-radius: 16px;
   background-color: #fff;
   margin: 20px auto;
   overflow: hidden;
 }
 .out{
   color: red;
 }
 .van-popup{
  border-radius: 0px;
  background-color: #f1f2f3;
}
</style>
