<template>
    <div id="countriesTable">
      <table class="table_list">
        <thead>
          <tr class="table_list_tr">
            <td class="table_thead_td thead_td_item1 thead_td_color1">地区</td>
            <td class="table_thead_td thead_td_item2 thead_td_color2">
              现存确诊
            </td>
            <td class="table_thead_td thead_td_item2 thead_td_color3">
              累计确诊
            </td>
            <td class="table_thead_td thead_td_item2 thead_td_color4">
              累计治愈
            </td>
            <td class="table_thead_td thead_td_item2 thead_td_color5">
              累计死亡
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table_list_tr country_tr"
            v-for="item in state.countryData"
            :key="item.name"
          >
            <td class="td_item item_country">
              <div class="td_item_name">{{ item.name }}</div>
            </td>
            <td class="td_item">
              <div class="td_item_count">{{ item.nowConfirm  }}</div>
              <div class="td_item_newAdd">
                {{ setData(item.nowConfirmCompare)   }}
              </div>
            </td>
            <td class="td_item">
              <div class="td_item_count">{{ item.confirm  }}</div>
              <div class="td_item_newAdd">{{ setData(item.confirmAdd)   }}</div>
            </td>
            <td class="td_item">
              <div class="td_item_count">{{ item.heal  }}</div>
              <div class="td_item_newAdd">{{ setData(item.healCompare)   }}</div>
            </td>
            <td class="td_item">
              <div class="td_item_count">{{ item.dead  }}</div>
              <div class="td_item_newAdd">{{ setData(item.deadCompare)   }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
<script setup>
import { getAllCountryData } from "@/api/worldReport";
import "@/assets/css/vantCss/countriesTable.css"
import {onMounted,nextTick, reactive} from 'vue'
  
let state = reactive(
    {countryData : null}
)


  


onMounted(()=>{    

    getAllCountryData().then((res) => {
                state.countryData = res.data.data;
            });


    nextTick(() => {
        
        
    });

    
  
    
})   
      



  
function setData(val) {
      if (val == 0) {
        return "无新增";
      } else if (val[0] != "-") {
        return "+" + val;
      } else {
        return val;
      }
}

  
  
  </script>
  <style scoped>
  

  .sticky_thead {
    display: flex;
    align-items: center;
  }
  .table_list {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    position: relative;
    table-layout: auto;
  }
  .table_list_tr {
    box-sizing: border-box;
    border-bottom: 1px solid rgb(236, 236, 236);
  }
  .table_list_tr td {
    padding: 7px 0;
  }
  .table_list_tr td .iconfont {
    font-size: 11px;
  }
  .thead_td_item1 {
    width: 15% !important;
    word-wrap: break-word;
    word-break: break-all;
  }
  .td_item_newAdd {
    font-size: 10px;
    margin-top: 3px;
    color: #727272;
  }
  .td_item_count {
    font-size: px;
    
  }
  .thead_td_item2 {
    padding: 7px 3px !important;
  }
  .thead_td_item3 {
    width: 10%;
  }
  .table_thead_td {
    padding: 7px 0 !important;
    font-size: 16px;
  }
  .thead_td_color1 {
    background-color: rgba(236, 236, 236, 0.486);
  }
  .thead_td_color2 {
    background-color: rgba(255, 228, 188, 0.486);
    color: rgb(248, 185, 91);
  }
  .thead_td_color3 {
    background-color: rgba(255, 153, 153, 0.486);
    color: rgb(255, 110, 110);
  }
  .thead_td_color4 {
    background-color: rgba(154, 255, 154, 0.486);
    color: rgb(67, 221, 67);
  }
  .thead_td_color5 {
    background-color: rgba(148, 148, 148, 0.486);
    color: rgb(100, 100, 100);
  }
  .td_item_name {
    font-weight: 550 ;
    font-size: 15px;
  }
  .country_tr:nth-of-type(even) {
    background-color: #9696960c;
  }
  .sticky_container {
    
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

   
  }
  .sticky_thead_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    float: left;
   
    font-size: 17px;
    padding: 10px 0;
    
  }
  .thead_item1 {
    background-color: #f6f6f6 !important;
    font-size:17px;
  }
  .thead_item2 {
    background-color: #fff2de !important;
    font-size:17px;
  }
  .thead_item3 {
    background-color: #ffcdcd !important;
    font-size:17px;
  }
  .thead_item4 {
    background-color: #ceffce !important;
    font-size:17px;
  }
  .thead_item5 {
    background-color: #cbcbcb !important;
    font-size:17px;
  }
  .item_country {
    width: 20%;
    color: #0099FF;
  }
  </style>