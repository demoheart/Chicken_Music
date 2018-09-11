<template>
  <transition name="slide">
    <div class="singer-detail">
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    console.log(this.singer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.singer-detail
  position fixed
  top 0px
  right 0px
  bottom 0px
  left 0px
  z-index 100
  background $color-background
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave
  transform translate3d(100%, 0, 0)
</style>
