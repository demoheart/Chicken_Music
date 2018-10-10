import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'

// 获取热门搜索
export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({},
    commonParams, {
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    })

  return jsonp(url, data, options)
}

// 获取搜索结果的列表
export function search (query, page, zhida) {
  const url = '/api/getSearch'

  const data = Object.assign({},
    commonParams, {
      w: query,
      p: page,
      catZhida: zhida ? 1 : 0,
      zhidaqu: 1,
      t: 0,
      flag: 1,
      ie: 'utf - 8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      remoteplace: 'txt.mqq.all',
      uid: 0,
      needNewCode: 1,
      platform: 'h5',
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
