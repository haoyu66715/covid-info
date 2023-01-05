<template>
    <div id="demosticCityTable">
    <table class="city_table">
      <thead>
        <tr>
          <td class="head_td1 table_head_td">地区 </td>
          <td class="head_td2 table_head_td">现存确诊</td>
          <td class="head_td3 table_head_td">累计治愈</td>
          <td class="head_td4 table_head_td">累计确诊</td>
          <td class="head_td5 table_head_td">累计死亡</td>
        </tr>
      </thead>
      <tbody class="province_tbody" v-for="item,index in state.cityDetail" :key="index">
        <tr  class="borderB">
          <td class="body_td body_td_city">{{item.name}}</td>
          <td class="body_td">
            <div>{{item.total.nowConfirm}}</div>
            <div class="td_tip">{{addCount(item.today.confirm)}}</div>
          </td>
          <td class="body_td">{{item.total.heal}}</td>
          <td class="body_td">{{item.total.confirm}}</td>
          <td class="body_td">{{item.total.dead}}</td>
          
        </tr>
        
      </tbody>
    </table>
    
  </div>
</template>

<script setup>
import {onMounted,reactive} from "vue";
import {useStore} from "vuex"

const store = useStore();
const state = reactive(
    {cityDetail:null}
)


onMounted(() =>{
    setTimeout(() => {

      if (store.state.demosticDetail) {
        state.cityDetail=store.state.demosticDetail.areaTree[0].children
        
      }
    }, 500);
    return {state}
})

function addCount(val){
     if (val > 0) {
      return '较昨日+' + val
    } else if (val == 0) {
      return '较昨日无新增'
    } else {
      return '较昨日' + val
    }
}



</script>



<style scoped>
#demosticCityTable{
  width: 100%;
  margin-top: 25px;
  height: auto;
}
.city_table{
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  position: relative;
  table-layout : auto;
}

.table_head_td{
  padding: 10px 0;
  font-size: 18px;
}
.head_td1{
  color: #000;
  background-color: rgba(146, 146, 146, 0.116);
}
.head_td2{
  color: #f74040;
  background-color: rgba(247, 64, 64, 0.116);
}
.head_td3{
  color: rgb(36, 202, 36);
  background-color: rgba(36, 202, 36, 0.116);
}
.head_td4{
  color: rgb(201, 42, 42);
  background-color: rgba(201, 42, 42, 0.116);
}
.head_td5{
  color: rgb(99, 59, 97);
  background-color: rgba(99, 59, 97, 0.116);
}

.body_td{
  padding: 7px 0;
  font-size: 17px;
  font-weight: 350;
  box-sizing: border-box;
}
.body_td .td_tip{
  font-size: 17px;
  color: rgb(141, 141, 141);
  font-weight: normal;
  margin-top: 3px;
}
.body_td_city{
  color: #0099FF;

}
.borderB{
  border-bottom: 1px solid rgb(240, 240, 240);
}
.body_td .iconfont{
  font-size: 10.5px;
  color: rgb(143, 143, 143);
}
.province_container_td{
  font-size: 12px;
  padding: 8px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(245, 245, 245);
}
.province_container_td span{
  word-break: break-all;
  white-space: normal;
}

.cityName{
  max-width: 30px !important; 
}
</style>