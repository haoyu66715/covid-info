<template>
    <div class="globalMap">        
            <div id="global_map_container">
                
            </div>
    </div>
</template>


<script setup>
import {onMounted,reactive} from 'vue'
import { getAllCountryData } from "@/api/worldReport"; // 网络请求
import { getWorldJson } from "@/api/vaccineInformation";
import {useStore} from "vuex"
import { nextTick } from 'vue'
import * as echarts from 'echarts'
import world from "@/plugins/js/world";


let mapDom;
const store = useStore();
let mapJson ;  // 世界地图数据
let worldData= {  // 世界基本数据
        confirm: [],
};


onMounted(()=>{
    getWorldJson().then((res) => {  // 发起请求获取地图数据
        
      mapJson = res.data;
   
      setMapChart()  // 设置图表数据

    });
  
})


function setCountryData(str) {
    console.log(store.state.allCountryData)
    for (let item of store.state.allCountryData) {
        worldData[str].push({
          name: item.name,
          value: item[str],
        });
    }
    worldData[str].push({
        name: "中国",
        value: store.state.demosticDetail.chinaTotal[str],
    });
}

function getAllData() {  // 获取所有数据
      if (!store.state.allCountryData) {
        // 判断是否储存了数据
        getAllCountryData().then((res) => {
          store.state.allCountryData = res.data.data;
          
          for (const item of res.data.data) {
            worldData.confirm.push({
              name: item.name,
              value: item.confirm,
            });
          }
          worldData.confirm.push({
            name: "中国",
            value: store.state.demosticDetail.chinaTotal.confirm,
          });
        });
      } else {
        // console.log(store.state.allCountryData)
        for (const item of store.state.allCountryData) {
          worldData.confirm.push({
            name: item.name,
            value: item.confirm,
          });
        }
        worldData.confirm.push({
          name: "中国",
          value: store.state.demosticDetail.chinaTotal.confirm,
        });
      }
     
}

function getMapOptions(data, pieces, world, formatterText) {
      // 生成地图数据
      return {
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "12", // 文字字体大小
          },
          triggerOn: "click",
          padding: [7],
          backgroundColor: "rgba(0, 0, 0, 0.623)",
          borderColor: "transparent",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: function (params) {
            
            if (Number.isNaN(params.value)) {
              return (
                "国家/地区 : " +
                params.name +
                "<br/>" +
                formatterText +
                "数据不详"
              );
            } else {
              return (
                "国家/地区 : " +
                params.name +
                "<br/>" +
                formatterText +
                params.value +
                "人"
              );
            }
          },
        },
        visualMap: {
          type: "piecewise",
          splitNumber: 6,
          orient: "horizontal",
          itemGap: 0,
          pieces,
          bottom: 10,
          left: 10,
          itemWidth: 45,
          itemHeight: 6,
          showLabel: false,
          left: "center",
        },
        series: [
          {
            name: "World Population (2010)",
            type: "map",
            mapType: "world",
            roam: false,
            zoom: 1.2,
            itemStyle: {
              emphasis: {
                // 也是选中样式
                borderWidth: 2,
                borderColor: "#fff",
                areaColor: "#3dbd16",
                label: {
                  show: false,  //不显示国家名
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
            },
            data,
            nameMap: world,
          },
        ],
      };
}

function setMapChart() {
      // 设置世界地图图表
      nextTick(() => {
        
        mapDom = echarts.init(  // 初始化echarts对象
          document.getElementById("global_map_container"),
          null,
          { renderer: "svg" }  
        );

          
        
        getAllData(); // 获取数据
        
        setTimeout(() => {
          echarts.registerMap("world", mapJson);
          mapDom.setOption(
            getMapOptions(
              worldData.confirm,
              [
                // 自定义每一段的范围，以及每一段的文字
                { gte: 10000000, color: "#d11010" }, 
                { gte: 1000000, lte: 9999999, color: "#ff3e3e" },
                { gte: 100000, lte: 999999, color: "#ff6e6e" },
                { gte: 10000, lte: 99999, color: "#ffa0a0" },
                { gte: 11, lte: 9999, color: "#fdc1c1" },
                { lte: 10, color: "#fff5f5" }, 
                
            
              ],
              world,
              "累计确诊人数 : "
            )
          )
          mapDom.resize();
        }, 200);
         //echarts自适应问题
         window.addEventListener('resize', () => {
            mapDom.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
      });
}

</script>

<style lang="less" scoped>
.globalMap {
  width: 100%;
  margin-bottom: var(--marginB);
  margin-top: 70px;
  position: relative;
  
}


#global_map_container{
    
    width: 100%;
    height: 660px;

}

.shareContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}
</style>