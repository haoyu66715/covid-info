<template>
    
    <div v-if="state.worldData" id="reportTable">
      <div class="table_item_color1 report_table_item">
        <div class="table_item_newData">
          较上日<div class="addTip"> {{ setAddNum(state.worldData.nowConfirmAdd)   }}</div>
        </div>
        <div class="table_item_num">{{ state.worldData.nowConfirm }}</div>
        <div class="table_item_title">现有确诊</div>
      </div>
      <div class="table_item_color2 report_table_item">
        <div class="table_item_newData">
          较上日<div class="addTip"> {{ setAddNum(state.worldData.confirmAdd)  }}</div>
        </div>
        <div class="table_item_num">{{ state.worldData.confirm }}</div>
        <div class="table_item_title">累计确诊</div>
      </div>
      <div class="table_item_color3 report_table_item">
        <div class="table_item_newData">
          较上日<div class="addTip"> {{ setAddNum(state.worldData.healAdd)   }}</div>
        </div>
        <div class="table_item_num">{{ state.worldData.heal }}</div>
        <div class="table_item_title">累计治愈</div>
      </div>
      <div class="table_item_color4 report_table_item">
        <div class="table_item_newData">
          较上日<div class="addTip"> {{ setAddNum(state.worldData.deadAdd)   }}</div>
        </div>
        <div class="table_item_num">{{ state.worldData.dead }}</div>
        <div class="table_item_title">累计死亡</div>
      </div>
    </div>
  </template>
  
<script setup>
import { getWorldData } from "@/api/worldReport";
import {useStore} from "vuex"
import {reactive,onMounted} from "vue";

const store = useStore();
const state = reactive(
    {worldData:null},
)

function setAddNum(num) {
      // 设置数据格式
      let str = num.toString();
      if (str[0] != "-") {
        return "+" + str;
      }
      return str;
    }
function getData() {
        // 获取数据
        getWorldData().then((res) => {
          store.state.worldData = res.data.data;
          state.worldData = store.state.worldData.WomWorld;
        });
        store.state.indexSet++;
      }

onMounted(()=>{
    getData();

})
  
</script>
<style scoped>
  #reportTable {
    width: 100%;
    display: flex;
    background-color: #fff;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.08);
    margin-bottom: var(--marginB);
    height: 120px;
   
  }
  .table_item_title {
    font-size: 15px;
  }
  .report_table_item {
    flex: 1;
    text-align: center;
    padding: 13px 0;
    
  }
  .table_item_color1 {
    background-color: hsla(0, 100%, 64%, 0.11);
  }
  .table_item_color1 .table_item_num {
    color: #ff4747;
  }
  .table_item_color1 .addTip {
    color: #ff4747;
  }
  .table_item_color2 {
    background-color: hsla(0, 74%, 42%, 0.11);
  }
  .table_item_color2 .table_item_num {
    color: #b91c1c;
  }
  .table_item_color2 .addTip {
    color: #b91c1c;
  }
  .table_item_color3 {
    background-color: hsla(115, 93%, 44%, 0.11);
  }
  .table_item_color3 .table_item_num {
    color: #19d808;
  }
  .table_item_color3 .addTip {
    color: #19d808;
  }
  .table_item_color4 {
    background-color: hsla(0, 0%, 51%, 0.11);
  }
  .table_item_color4 .table_item_num {
    color: #838383;
  }
  .table_item_color4 .addTip {
    color: #838383;
  }
  .table_item_num {
    font-size: 18px;
    margin-bottom: 2px;
  }
  .table_item_newData {
    font-size: 12px;
    margin-bottom: 3px;
  }
  </style>