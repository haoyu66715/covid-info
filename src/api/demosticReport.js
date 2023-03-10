import {request} from './request'

export function getEpidemicTrend() {  // 获取国内疫情趋势
  return request({
    url: 'query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare'
  })
}

export function getDemosticDetail() {  // 获取国内基本数据
  return request({
    url: '/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf'
  })
}

export function getDemosticNoinfect() {  // 获取国内无症状感染数量
  return request({
    url: '/query/inner/publish/modules/list?modules=asymptomaticProvince'
  })
}
