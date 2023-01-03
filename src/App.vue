<template>
  <div id="app">
    <router-view></router-view>
    <Player v-show="showPlayer&&$route.path !== '/fm'"></Player>
  </div>
</template>

<script>
import Player from '@/components/Player/Player'
import { mapState } from 'vuex'
export default {
  components: {
    Player
  },
  computed: {
    ...mapState({
      showPlayer: state => (state.currentIndex >= 0)
    })
  }

}
</script>

<style lang="less" scoped>
#app{
  height: 100%;
}
</style>
