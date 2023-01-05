<template>
    <div class="demosticMap">        
            <div id="demostic_map_container">
                
            </div>
    </div>
</template>


<script setup>
import {onMounted} from 'vue'
import { getDemosticDetail } from "@/api/demosticReport"; // 网络请求
import {useStore} from "vuex"
import { nextTick,defineProps,toRefs,ref } from 'vue'
import * as echarts from 'echarts'


const props = defineProps({
    typeIndex: {
      type: Number,
      default: 0
    }
})


const store = useStore();
let allCityDetail = [];

let myChart;
//现存确诊
const  nowPieces = [
        // 图表参数
        {
          // 现存确诊
          min: 1000,
          color: "#7D1818",
          label: "1000人以上",
        },
        {
          min: 700,
          max: 1000,
          color: "#BF2321",
          label: "700-1000人",
        },
        {
          min: 300,
          max: 700,
          color: "#FF7B66",
          label: "300-700人",
        },
        {
          min: 1,
          max: 300,
          color: "#FFA789",
          label: "1-300人",
        },
        {
          max: 0,
          min: 0,
          color: "#ffffff",
          label: "无确诊人数",
        },
]

function setMapOptions(cityData, nowPieces) {
      
      return {
        // 视图映射工具，根据value来直观的显示数据所在区间
        visualMap: {
          show: true,
          type: "piecewise",
          splitNumber: 4,
          itemWidth: 24,
          itemHeight: 12,
          itemGap: 5,
          textStyle: {
            color: "#999",
            fontSize: 12,
          },
          pieces: nowPieces,
        },
        //触发时显示详细数据
        tooltip: {
          trigger: "item",
          triggerOn: "click",
          textStyle: {
            color: "#FFF", 
            fontSize: "12", 
          },
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
            return (
              "地区：" +
              params.data.name +
              "<br>" +
              "确诊人数：" +
              params.data.value
            );
          },
        },
        series: [
          {
            name: "",
            type: "map",
            mapType: "china",
            roam: false,
            zoom: 1.2,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            label: {
              normal: {
                textStyle: {
                  fontSize: 10,
                  color: "#333",
                },
              },
              emphasis: {
                show: true,
              },
            },
            data: cityData != undefined ? cityData : [],
          },
        ],
      };
}

onMounted(async()=>{
    let res = await getDemosticDetail();
    store.state.demosticDetail = res.data.data.diseaseh5Shelf; 
    store.state.demosticList = store.state.demosticDetail;

    nextTick(()=>{
        
        
        if(store.state.demosticDetail){

            let result = store.state.demosticDetail.areaTree[0].children;
           
            for (let item of result) {
            // 格式化数据
                allCityDetail.push({
                    // 添加到现存数据当中
                    name: item.name,
                    value: item.total.nowConfirm,
                });
            }


            let option =  setMapOptions(allCityDetail,nowPieces)
            
            setTimeout(() => {
                myChart = echarts.init(
                    document.getElementById("demostic_map_container"),
                    null,
                    { renderer: "svg" }
                );             
              
                myChart.setOption(option);
                myChart.resize();
            }, 100);


            //echarts自适应问题
            window.addEventListener('resize', () => {
                myChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行

        }
         
    });
})





</script>

<style lang="less" scoped>
.demosticMap {
  width: 100%;
  margin-bottom: var(--marginB);
  margin-top: 70px;
  position: relative;
  
}


#demostic_map_container{
    
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