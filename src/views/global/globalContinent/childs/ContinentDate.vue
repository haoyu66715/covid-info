<template>
    <div id="continentData">
      <van-popover
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
        :placement="'bottom-end'"
      >
       
      </van-popover>
      <div id="continentChartDom"></div>
      <div class="btnList">
        <div
          @click="toggleContinentData(index)"
          v-for="(item, index) in btnList"
          :key="index"
          :class="[state.activeIndex == index ? 'activeBtnItem' : '', 'btnItem']"
        >
          <div
            :class="['continentClass' + index]"
            style="display: flex; align-items: center"
          >
            <img :class="['continentIcon' + index]" :src="item.icon" alt="" />
            <span :class="['continentName' + index]">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import {useStore} from "vuex"
import * as echarts from 'echarts'
import {onMounted,nextTick, reactive} from "vue";

const store = useStore();
  let myChart;
  let showPopover = false;
  let actions = [
                    { text: "累计确诊" },
                    { text: "累计治愈" },
                    { text: "累计死亡" },
                ] ;
let state = reactive(
    {activeIndex:0},
)

let  totalNewConfirm = 0; // 新确诊
let  totalConfirm = 0; // 累计确诊
let  totalHeal= 0; // 累计治愈
let  totalDead= 0; // 累计死亡
let  overseaData= {
                        asia: [], // 亚洲
                        africa: [], // 非洲
                        oceania: [], // 大洋洲
                        northAmerica: [], // 北美洲
                        southAmerica: [], // 南美洲
                        europe: [], // 欧洲
                    };
let  btnList = [
                    {
                        icon: require("@/assets/image/asia.svg"),
                        name: "亚洲",
                    },
                    {
                        icon: require("@/assets/image/africa.svg"),
                        name: "非洲",
                    },
                    {
                        icon: require("@/assets/image/oceania.svg"),
                        name: "大洋洲",
                    },
                    {
                        icon: require("@/assets/image/northAmerica.svg"),
                        name: "北美洲",
                    },
                    {
                        icon: require("@/assets/image/southAmerica.svg"),
                        name: "南美洲",
                    },
                    {
                        icon: require("@/assets/image/europe.svg"),
                        name: "欧洲",
                    },
        ];
let legendData = [];
let dataList = [];
let areaName = "asia";
let dataType = "confirm";
let dataText = "累计确诊";
   
    
function onSelect(action) {
        dataText = action.text;
        switch (action.text) {
          case "累计确诊":
            dataType = "confirm";
            break;
          case "累计治愈":
            dataType = "heal";
            break;
          case "累计死亡":
            dataType = "dead";
            break;
        }
        createChart(areaName, dataType);
}
  
function  toggleContinentData(index) {
        state.activeIndex = index;
        
        switch (index) {
          case 0:
            areaName = "asia";
            break;
          case 1:
            areaName = "africa";
            break;
          case 2:
            areaName = "oceania";
            break;
          case 3:
            areaName = "northAmerica";
            break;
          case 4:
            areaName = "southAmerica";
            break;
          case 5:
            areaName = "europe";
            break;
        }
        createChart(areaName, dataType);
}
  
function  createChart(continent, dataType) {
        getCountryList(continent, dataType); // 格式化数据
        let option = {
          tooltip: {
            trigger: "item",
            formatter: `{b}(${dataText}):{c}例 <br/>`,
          },
          legend: {
            type: "scroll",
            orient: "horizontal",
            right: 0,
            bottom: 0,
            data: legendData,
         
          },
          series: [
            {
              name: "continent",
              type: "pie",

              minAngle: 5,//最小角度
              startAngle:180, //起始角度
              radius: "55%",
              center: ["50%", "48%"],
              data: dataList,
              labelLine: {
                length: 10,
                length2: 20,
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                 },
                tooltip: {
                    show: false
                }
              },
              label:{
                normal:{
                    // show:false
                    show:true
                },
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                  
                },
                
              },
            },
          ],
        };
        myChart.setOption(option);
}
  
function  getCountryList(continentName, dataType) {
        // 格式化数据
        legendData = [];
        dataList = [];
        totalNewConfirm = 0; // 新确诊
        totalConfirm = 0; // 累计确诊
        totalHeal = 0; // 累计治愈
        totalDead = 0; // 累计死亡
        for (const item of overseaData[continentName]) {
          legendData.push(item.name);
          dataList.push({
            name: item.name,
            value: item[dataType],
          });
          totalNewConfirm += item.nowConfirm;
          totalConfirm += item.confirm;
          totalHeal += item.heal;
          totalDead += item.dead;
        }
        
        
    }
    
onMounted(()=>{
        setTimeout(() => {
        let data = store.state.worldData.WomAboard;
        for (const item of data) {
          // 处理数据
          switch (item.continent) {
            case "亚洲":
              areaName = "asia";
              break;
            case "非洲":
              areaName = "africa";
              break;
            case "大洋洲":
              areaName = "oceania";
              break;
            case "北美洲":
              areaName = "northAmerica";
              break;
            case "南美洲":
              areaName = "southAmerica";
              break;
            case "欧洲":
              areaName = "europe";
              break;
          }
          overseaData[areaName].push(item);

        }
        nextTick(() => {
          // 创建erchart实例
          myChart = echarts.init(
            document.getElementById("continentChartDom")
          );
          createChart("asia", "confirm");
        });
      }, 1000);
    }) 
    

  
  </script>
  <style>
  .van-popover__action {
    height: 40px;
    font-size: 11px !important;
    padding: 0 15px;
    
  }
  </style>
  <style scoped>
  #continentData {
    margin-bottom: var(--marginB);
    position: relative;
  }
  .van-popover__wrapper {
    position: absolute;
    right: 0;
    z-index: 9999;
  }
  

  #continentChartDom {
    width: 100%;
    height: 700px;
    margin-top: 10px;
  }
  .btnList {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 8px;
    justify-content: space-around;
  }
  .btnItem {
    width: 29%;
    font-size: 12px;
    display: flex;
    align-items: center;
    height: 35px;
    justify-content: center;
    border-radius: 8px;
    background-color: rgb(253, 253, 253);
    border: 1px solid #ccc;
    margin-bottom: 5px;
    transition: 0.2s all linear;
  }
  .activeBtnItem {
    background-color: rgba(33, 175, 241, 0.212) !important;
    color: #21aff1 !important;
    border: 1px solid #21aff1;
  }
  .dataTable {
    display: flex;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
  }
  .tableItem {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
  }
  .itemData {
    font-size: 15px;
  }
  .tableItem:nth-child(1) {
    background-color: hsla(0, 100%, 64%, 0.11);
  }
  .tableItem:nth-child(2) {
    background-color: hsla(0, 74%, 42%, 0.11);
  }
  .tableItem:nth-child(3) {
    background-color: hsla(115, 93%, 44%, 0.11);
  }
  .tableItem:nth-child(4) {
    background-color: hsla(0, 0%, 51%, 0.11);
  }
  .continentIcon0 {
    width: 30px;
  }
  .continentIcon1 {
    width: 25px;
  }
  .continentIcon2 {
    width: 25px;
  }
  .continentName3 {
    margin-left: 4px;
  }
  .continentName4 {
    margin-left: 4px;
  }
  .continentName5 {
    margin-left: 4px;
  }
  .continentClass0 {
    position: relative;
    left: -3px;
  }
  .continentClass1 {
    position: relative;
    left: -3px;
  }
  </style>