<template>
    <div id="demosticTrend">
        <div class="trend_item">
                
        </div>
    </div>
</template>

<script setup> 
    import { getEpidemicTrend } from "@/api/demosticReport";
    import {useStore} from "vuex"
    import {onMounted} from "vue";
    import * as echarts from 'echarts'

    const store = useStore();
    let myChart;
    let dateList=[];
    let nowConfirmList = [];


    function epidemicTrend() {
      // 获取数据
      getEpidemicTrend().then((res) => {
        store.state.chinaTrendDetail = res.data.data; // 保存数据
        for (const item of res.data.data.chinaDayList) {
          dateList.push(item.date); // 添加日期
          // console.log(dateList)
          nowConfirmList.push(item.nowConfirm); // 现有确诊
        }
      });
    }

    function chartsOption(titleText = "", xData = [], color = [], series = []) {
      // 图表设置选项
      return {
        title: {
          // 标题
          text: titleText,
          textStyle: {
            fontSize: 14,
          },
          top: "3%",
          left: "1%",
        },
        color, // 颜色
        grid: {
          // 布局
          top: "22%",
          left: "3%",
          right: "3%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          triggerOn: "click",
          textStyle: {
            color: "#FFF", // 文字的颜色
            fontSize: "12", // 文字字体大小
          },
          padding: [7],
          backgroundColor: "rgba(0, 0, 0, 0.66)",
          borderColor: "transparent",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: function (params) {
            let str = `日期：${params[0].axisValue}<br>`;
            for (const item of params) {
              str += `${item.marker} ${item.seriesName}：${item.data}<br>`;
            }
            return str;
          },
        },
        legend: {
          // 图例
          itemWidth: 24,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
          },
          top: "10%",
          left: "5%",
          left: 'left'
        },
        xAxis: [
          // x轴
          {
            type: "category",
            data: xData,
            axisLabel: {
              rotate: 40,
              textStyle: {
                fontSize: "10",
              },
            },
            axisTick: {
              show: true,
              alignWithLabel: true,
            },
          },
        ],
        yAxis: {
          // y轴
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: "10",
            },
          },
          nameGap: 20,
        },
        series, // 数据源
      };
    }

    function loadCharts(){
        let option = chartsOption(
            "全国现有确诊趋势",
              dateList,
              ["#be1313"],
              [
                {
                  name: "现有确诊",
                  type: "line",
                  data: nowConfirmList,
                },
              ]
        );
        myChart.setOption(option);
    }

onMounted(() =>{
   epidemicTrend();
   setTimeout(() => {
      if (store.state.chinaTrendDetail) {
      
        myChart = echarts.init(
          document.querySelector(".trend_item"),
          null,
          { renderer: "svg" }
        );
      }
      loadCharts();
    }, 600);
})

</script>

<style scoped>
#demosticTrend {
  width: 100%;
  height: 320px;
  margin-bottom: 10px;
  margin-top: 30px;
  border-radius: 7px;
  border: 2px solid rgba(19, 19, 19, 0.062);
  box-sizing: border-box;


}



.trend_item {
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.466); */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>