<template>
    <div id="VaccineDetailTable">
      <div class="table_thead">
        <div class="thead_items1">国家(地区)</div>
        <div class="thead_items1">疫苗信息</div>
        <div class="thead_items1">累计接种</div>
        <div class="thead_items1">每百人接种</div>
        <div class="thead_items1">最新日期</div>
        <div style="clear:both"></div>
      </div>
      <table class="detail_table">
        <tbody class="vaccine_table_tbody">
          <tr class="vaccine_table_tr" v-for="(item, index) in  state.vaccineData" :key="index">
            <td class="vaccine_td_item vaccine_th1">{{ item.country }}</td>
            <td class="vaccine_td_item vaccine_th2">{{ item.vaccinations }}</td>
            <td class="vaccine_td_item vaccine_th3">{{ setUnit (item.total_vaccinations)  }}剂</td>
            <td class="vaccine_td_item vaccine_th3">
              {{ item.total_vaccinations_per_hundred }}剂
            </td>
            <td class="vaccine_td_item vaccine_th3">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script setup>
import { getVaccineAllData } from "@/api/vaccineInformation";
import {onMounted,nextTick, reactive} from 'vue'

let state = reactive(
    {vaccineData : []}
)      
      
 onMounted(()=>{
    getVaccineAllData().then((res) => {
        state.vaccineData = res.data.data.VaccineSituationData;
        nextTick(() => {
          let theadDom = document.getElementsByClassName('thead_items1')
          let theadTrDomItem = document.getElementsByClassName('vaccine_table_tr')[0].getElementsByClassName('vaccine_td_item')
          for (let i = 0; i < theadTrDomItem.length; i++) {
            theadDom[i].style.width = (window.getComputedStyle(theadTrDomItem[i])).width
            if (i != theadTrDomItem.length - 1) {
              theadDom[i].style.marginRight = '1.6px'
            }
          }
        })  
    })
 })  
     


let addWan = function (integer, number, mutiple, decimalDigit) {
  var digit = getDigit(integer);
  if (digit > 3) {
    var remainder = digit % 8;
    if (remainder >= 5) { // ‘十万’、‘百万’、‘千万’显示为‘万’ 
      remainder = 4;
    }
    return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
  } else {
    return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
  }
}
let getDigit = function (integer) {
    let digit = -1;
    while (integer >= 1) {
        digit++;
        integer = integer / 10;
    }
    return digit;
}
function setUnit(number, decimalDigit){ // 设置单位
        decimalDigit = decimalDigit == null ? 2 : decimalDigit;
        var integer = Math.floor(number);
        var digit = getDigit(integer);
        // ['个', '十', '百', '千', '万', '十万', '百万', '千万']; 
        var unit = [];
        if (digit > 3) {
            var multiple = Math.floor(digit / 8);
            if (multiple >= 1) {
            var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
            unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
            for (var i = 0; i < multiple; i++) {
                unit.push('亿');
            }
            return unit.join('');
            } else {
            return addWan(integer, number, 0, decimalDigit);
            }
        } else {
            return number;
        }
}      
  </script>
  <style scoped>
  .detail_table {
    width: 100%;
    text-align: center;
  }
  .detail_table thead th {
    padding: 7px 5px;
    color: var(--color);
    font-size: 11px;
  }
  .vaccine_th1 {
    width: 60px;
  }
  .vaccine_th2 {
    max-width: 100px;
    word-break: keep-all;
    word-wrap: break-word;
  }
  .vaccine_table_tbody td {
    padding: 7px 0;
    box-sizing: border-box;
    font-size: 13px;
  }
  .vaccine_th3 {
    width: 100px !important;
  }
  .vaccine_table_tbody tr:nth-of-type(even) {
    background-color: #00aeff0c;
  }
  .table_thead{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .thead_items1{
    float: left;
    text-align: center;
    background-color: #4db4e4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 5px;
    box-sizing:border-box;
    font-size: 16px;
    height: 45px;
  }
  </style>