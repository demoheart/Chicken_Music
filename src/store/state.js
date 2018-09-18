import {playMode} from 'common/js/config'
const state = {
  singer: {},
  play: false, // 播放/暂停 (默认暂停)
  fullScreen: false, // 播放器的显示(最大化)/隐藏(最小化) (默认隐藏)
  playList: [], // 播放列表
  sequenceList: [], // 播放模式为：顺序播放
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 当前歌曲的索引
}

export default state
