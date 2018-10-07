import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'

// 获取轮播图列表
export function getRecommend () {
  const url = 'http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({},
    commonParams, {
      platform: 'h5',
      uin: 0,
      needNewCode: 1
    })

  return jsonp(url, data, options)
}

// 获取歌单列表
export function getDiscList () {
  const url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  const data = Object.assign({},
    commonParams, {
      platform: 'yqq',
      hostUin: 0,
      sin: 0,
      ein: 29,
      sortId: 5,
      needNewCode: 0,
      categoryId: 10000000,
      rnd: Math.random(),
      format: 'json'
    })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取推荐页面详情歌单列表(代理配置请查看 webpack.dev.conf.js 文件)
export function getSongList (disstid) {
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParams, {
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 67232076,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    let ret = res.data
    if (typeof ret === 'string') {
      let reg = /^\w+\(({[^()]+})\)$/
      let matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    return Promise.resolve(ret)
  })
}
