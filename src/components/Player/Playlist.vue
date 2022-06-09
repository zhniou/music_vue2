<template>
  <div class="playlist">
    <van-action-sheet
     :overlay='false'
     :round='false'
     v-model="showPlaylist"
     title="播放歌单">
     <div class="content">
       <div class="song_item ellipsis1"
        v-for="(item,index) in playList"
       :key="index"
       @click="playMusic(index)"
       >
         <span>{{item.name}}- </span>
         <span class="song_name" v-for="(ar,index) in item.ar" :key="index">{{ar.name}}</span>
       </div>
     </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      showPlaylist: false
    }
  },
  methods: {
    playMusic (index) {
      this.$emit('playmusic', index)
    }
  },
  computed: {
    ...mapState({
      playList: state => state.playList
    }),
    ...mapGetters({
      currentSong: 'currentSong'
    })
  },
  created () {
  }
}
</script>
<style lang="less" scope>
.playlist{
    .content {
     padding: 0 20px;
     height: 300px;
     box-sizing: border-box;
     .song_item{
       margin: 10px 0;
       .song_name{
         font-size: 15px;
         color: #666;
         padding: 5px;
       }
       span{
         font-size: 17px;
         color: #000;
       }
     }
    }
}
.van-action-sheet{
  width: 90%;
  margin-bottom: 110px;
}
.van-popup{
  border-radius: 20px;
  background-color: #f1f2f3;
}
</style>
