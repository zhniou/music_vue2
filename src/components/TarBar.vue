<template>
  <van-tabbar v-model="active" active-color="#ec4141" route>
  <van-tabbar-item  name="home" icon="home-o" to='/index'>首页</van-tabbar-item>
  <van-tabbar-item name="search" icon="search" to='/search'>搜索</van-tabbar-item>
  <van-tabbar-item name="mine" icon="friends-o" :to="{name:'userinfo',query:{userId}}">我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
export default {
  data () {
    return {
      active: 'home',
      userLoginStatus: '',
      userId: ''
    }
  },
  methods: {
    async getMyId () {
      this.userId = JSON.parse(localStorage.getItem('userinfo')).userId
      // console.log(this.myid)
    }
  },
  created () {
    this.getMyId()
  }
}
</script>

<style>

</style>
