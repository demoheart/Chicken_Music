import {commonParams} from './config'
import axios from 'axios'

export function getLyric (mid) {
  const url = '/api/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
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
