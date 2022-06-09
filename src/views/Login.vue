<template>
  <!-- 首页logo -->
  <div id="login">
    <div class="logo">
      <p>WX</p>
      <p>Music</p>
    </div>
    <!-- 登录按钮 -->
    <div class="button">
      <van-button type="default" block round @click="showLoginPopup"> 手 机 号 码 登 录 </van-button>
      <van-button type="danger" block round to="/index"> 免 登 录 立 即 体 验 </van-button>
    </div>

    <!-- 弹出层 -->
    <van-popup v-model="showPopup" position="top" class="popup_login" closeable>
      <div class="form">
        <!-- 文字描述 -->
        <div class="slogen">
          <p class="slg_title">请使用网易云帐号登录<br /><span>体验更多精彩！</span></p>
          <p class="slg_txt">这个世界因为音乐而变得悦耳！希望你能在这里找到属于你的那一片天地</p>
          <!-- <p class="slg_txt">
            <span class="slg_txt_tips"> tips: 手机号和密码为注册网易云音乐平台时候的手机和密码。由于接口为网络资源，且在本项目并没有进行加密，请注意帐号安全！ </span>
          </p> -->
        </div>
        <!-- 表单 -->
        <div class="text_input">
          <van-form @submit="login">
            <van-field v-model="phone" name="phone" label="手机号" placeholder="手机号" :rules="[{ required: true, pattern, message: '请填写正确的手机号' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <div class="loginbtn">
              <van-button round block type="danger" :disabled="!canSubmit" native-type="submit"> 登 录 </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  data () {
    return {
      showPopup: false,
      phone: '',
      password: '',
      pattern: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/
    }
  },
  methods: {
    showLoginPopup () {
      this.showPopup = true
    },
    // 登录
    async login () {
      const { data: res } = await login(this.phone, this.password)
      if (res.code === 200) {
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('userinfo', JSON.stringify(res.profile))
        this.$msg.success('登录成功')
        this.$router.push('/index')
      } else {
        this.$msg.fail(res.msg)
      }
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#ec4141')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  },
  computed: {
    canSubmit () {
      return Boolean(this.phone && this.password)
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    height: 50%;
    margin-top: 150px;
    text-align: center;
    p{
      color: #fff;
    }
  }
  .button {
    margin-top: 100px;
    width: 80%;
    >button{
    margin: 20px auto;
    }
  }
  .popup_login {
    width: 100%;
    height: 100%;
  }
  div.form {
    margin-top: 60px;
    border-radius: 0;
    .slogen {
      margin-left: 16px;
      color: #6c6c6c;
      .slg_title {
        font-size: 24px;
        line-height: 32px;
        > span {
          font-size: 18px;
        }
      }
      .slg_txt {
        margin-top: 18px;
        font-size: 14px;
      }
      .slg_txt_tips {
        color: red;
        font-size: 12px;
      }
    }
    .text_input {
      margin-top: 40px;
    }
    .loginbtn {
      margin: 16px;
    }
  }
}
.van-popup{
  border-radius: 0px;
  background-color: #f1f2f3;
}
.van-field{
  margin: 10px 0;
  border-radius: 5px;
}
</style>
