<template>
  <transition name="slide">
    <music-list :rank="rank" :bg-image="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import {getMusicList} from 'api/rank'
import { createSong } from 'common/js/song'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    bgImage () {
      return this.topList.picUrl
    },
    title () {
      return this.topList.topTitle
    },
    ...mapGetters([
      'topList'
    ])
  },
  created () {
    this._getMusicList()
  },
  methods: {
    _getMusicList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let musicData = item.data
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave
  transform translate3d(100%, 0, 0)
</style>
