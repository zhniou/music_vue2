<template>
  <div class="function">
  <van-grid>
  <!-- 每日推荐 -->
  <van-grid-item
  icon-prefix="my-icon"
  icon="recommend"
  text="每日推荐"
  to="/dailyrecommend" />
  <!-- 歌单 -->
  <van-grid-item
  icon-prefix="my-icon"
  icon="playlist"
  text="歌单"
  to="/playlist" />
  <!-- 私人FM -->
  <van-grid-item
  icon-prefix="my-icon"
  icon="fm"
  text="私人FM"
  to="/fm" />
  <!-- 排行榜 -->
  <van-grid-item
  icon-prefix="my-icon"
  icon="toplist"
  text="排行榜"
  to="/toplist"/>
  </van-grid>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scope>
.function{
  padding: 10px 0;
}
</style>
