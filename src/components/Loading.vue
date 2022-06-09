<template>
  <div>
    <van-loading type="spinner"
    size="40px"
    class="loading"
    v-show="this.$store.state.isLoading"/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
