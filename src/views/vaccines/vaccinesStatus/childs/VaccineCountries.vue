<template>
    <div id="VaccineCountries"></div>
  </template>
  
<script setup>
import {getVaccineCountries} from "@/api/vaccineInformation";
import {onMounted,nextTick} from 'vue'
import * as echarts from 'echarts'


let totalTrend = {  // 世界基本数据
    country: [],
    trend : []
};

       
onMounted(()=>{
    getVaccineCountries().then((res) => {
        // 发起网络请求
        let result = res.data.data.VaccineTrendData;
        for (const str in result.totalTrend) {
            totalTrend.country.push(str);
            if(typeof(selectData(result.totalTrend[str])) != 'undefined'){
                totalTrend.trend.push(selectData(result.totalTrend[str]));
            }
            
        }
        
        //两个接口数据为undefined？？?
        // totalTrend.country.splice(totalTrend.country.indexOf('越南'),1)
        totalTrend.country.splice(totalTrend.country.indexOf('墨西哥'),1)
        console.log(totalTrend.trend)
        
        nextTick(() => {
            setTimeout(() => {
              let mapDom = echarts.init(
                document.getElementById("VaccineCountries"),
                null,
                { renderer: "svg" }
              );

              mapDom.setOption( setLineChartsOption( totalTrend.country,  totalTrend.trend, '各国疫苗累计接种','剂'))        
            //   mapDom.hideLoading(); // 隐藏加载动画
            mapDom.resize()
            }, 500);
            window.addEventListener('resize', () => {
            mapDom.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
          });

      });

})

function selectData(dataArray, objName = "total_vaccinations") {  // 筛选合适的数据
        
        for (let i = dataArray.length - 1; i > -1; i--) {
          if (dataArray[i][objName] != -1 ) {
            
            return dataArray[i][objName];
          }
        }
}

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
function setLineChartsOption(country, data, text, unit) {  // 设置图表选项
       
        return {
          color: ['#1d99d3'],
          title: {
            text,
            textStyle: {
              fontSize: 14,
            },
            top: '-1%',
            left: "1%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            textStyle: {
              color: "#FFF", // 文字的颜色
              fontSize: '13',    // 文字字体大小
            },
            padding: [7],
            backgroundColor: "rgba(0, 0, 0, 0.623)",
            borderColor: "transparent",
            formatter: function (params) {
              let str = `国家：${params[0].name}</br>${params[0].marker} ${setUnit(params[0].value)}${unit}`
              return str;
            },
          },
          grid: {
            top: "7%",
            left: "4%",
            right: "6%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
            axisLabel: {
              textStyle: {
                fontSize:11,
              },
              formatter: function(val) {
                return setUnit(val)
              }
            },
          },
          yAxis: {
            type: "category",
            data: country,
            axisLabel: {
              textStyle: {
                fontSize: 12,
              },
            },
          },
          series: [
            {
              name: "",
              type: "bar",
              data,
            },
          ],
        };
}


  
  </script>
  <style scoped>
 #VaccineCountries{
    width: 100%;
    height: 400px;
    margin-bottom: var(--marginB);
    margin-top: 40px;
  }

  </style>