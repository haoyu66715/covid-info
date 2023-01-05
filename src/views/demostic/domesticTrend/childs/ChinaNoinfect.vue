<template>
    <div id="noTrend">
        <div class="demosticNoinfect"></div>
    </div>
    

</template>

<script setup>
import { getDemosticNoinfect } from "@/api/demosticReport";
import {useStore} from "vuex"
import * as echarts from 'echarts'
import {onMounted} from "vue";

const store = useStore();
let myChart;
let infectDetail = {
        increaseList: [], // 新增数据
        confirmList: [], // 累计数据
        cityList: [], // 城市
      }
function demosticNoinfect() {
      // 发起请求
      getDemosticNoinfect().then((res) => {
        store.state.chinaNoInfect = res.data.data; // 保存数据
        for (const item of res.data.data.asymptomaticProvince.confirm) {
          infectDetail.increaseList.push(item.increase); // 添加数据
          infectDetail.cityList.push(item.province);
          infectDetail.confirmList.push(item.confirm);
        }
        // myChart = echarts.init(
        //   document.querySelector("#demosticNoinfect"),
        //   null,
        //   { renderer: "svg" }
        // );
      });
}

function chartsOptions(cityList, confirmList, increaseList, yDetail, detailText) {
      return {
        title: {
          // 标题
          text: "无症状感染者趋势",
          textStyle: {
            fontSize: 14,
          },
          top: "1%",
          left: "1%",
        },
        color: ["#fd4a4a", "#fda94a"],
        legend: {
          itemWidth: 24,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
          },
          data: detailText,
          x: "left",
          top: "8%",
          right: "1%",
        },
        tooltip: {
          trigger: "axis",
          triggerOn: "click",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "12", // 文字字体大小
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
            let str = `地点：${params[0].axisValue}<br>`;
            for (const item of params) {
              str += `${item.marker} ${item.seriesName}:${item.data}<br>`;
            }
            return str;
          },
        },
        grid: {
          // 布局
          top: "26%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: cityList,
            axisLabel: {
              // 旋转角度
              interval: 0,
              rotate: 40,
              textStyle: {
                fontSize: 10,
              },
            },
          },
        ],
        yAxis: yDetail,
        series: [
          {
            name: detailText[0],
            type: "bar",
            data: confirmList,
            barWidth: 12,
          },
          {
            name: detailText[1],
            type: "line",
            yAxisIndex: 1,
            data: increaseList,
          },
        ],
      };
}
function getMaxNum(num) {
  
      let lastNum = num.toString();
      
      let num2 = num;
      if (parseInt(lastNum[lastNum.length - 1]) > 5) {
        num2 += 10 - parseInt(lastNum[lastNum.length - 1]);
      } else if (parseInt(lastNum[lastNum.length - 1]) < 5) {
        num2 += 5 - parseInt(lastNum[lastNum.length - 1]);
      }
      return num2;
}

function loadCharts() {
      let num = infectDetail.confirmList[0];
      let num2 = infectDetail.increaseList[0];
      for (const item of infectDetail.confirmList) {
        // 获取最大值
        if (item > num) {
          num = item;
        }
      }
      for (const item of infectDetail.increaseList) {
        // 获取最大值
        if (item > num2) {
          num2 = item;
        }
      }
      let options = chartsOptions(
        infectDetail.cityList,
        infectDetail.confirmList,
        infectDetail.increaseList,
        [
          {
            type: "value",
            // name: "现有无症状患者",
            name: "现有无症状",
            min: 0, // 设置最小值
            max: getMaxNum(num), // 设置最大值
            interval: getMaxNum(num) / 5,
            axisLabel: {
              textStyle: {
                fontSize: 11,
              },
            },
            nameTextStyle: {
              // 顶部名称字体大小
              fontSize: 11,
              align: "left", // 位置
            },
          },
          {
            type: "value",
            name: "新增",
            
            min: 0, // 设置最小值
            max: getMaxNum(num2), // 设置最大值
            interval: getMaxNum(num2) / 5,
            axisLabel: {
              // 字体大小
              textStyle: {
                fontSize: 11,
              },
            },
            nameTextStyle: {
              // 顶部名称字体大小
              fontSize: 11,
              align: "right", // 位置
            },
          },
        ],
        ["现有无症状患者", "新增无症状患者"]
        
      );
      myChart.setOption(options);
}

onMounted(() =>{
    demosticNoinfect();

    setTimeout(() => {
      if (store.state.chinaNoInfect) {
      
        myChart = echarts.init(
          document.querySelector(".demosticNoinfect"),
          null,
          { renderer: "svg" }
        );
      }
      loadCharts();
    }, 600);
   
})

</script>


<style scoped>

#noTrend {
  width: 100%;
  height: 320px;
  margin-top: 30px;
  border-radius: 7px;
  border: 2px solid rgba(19, 19, 19, 0.062);
  box-sizing: border-box;

}
.demosticNoinfect {
  width: 100%;
  height: 280px;
  margin-bottom: var(--marginB);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>