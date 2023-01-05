<template>
    <div id="VaccineMap"></div>
  </template>
  
<script setup>
import { getVaccineData, getWorldJson } from "@/api/vaccineInformation";
import * as echarts from 'echarts'
import world from "@/plugins/js/world";
import {onMounted,nextTick, reactive} from 'vue'

// let countryData = [];
// let mapData = null;

// let vaccineData = reactive( // 世界基本数据
//         {countryData : null},
//         {mapData : null}
// );
let vaccineData = {  // 世界基本数据
    countryData: [],
    mapData : null
};

onMounted(()=>{

    getVaccineData().then((res) => {
        
        // 获取全球疫苗数据
        for (let item of res.data.data.VaccineSituationData) {
            vaccineData.countryData.push({
                name: item.country,
                value: item.total_vaccinations,
                count: item.total_vaccinations_per_hundred,
          });
        }

        //console.log( vaccineData.countryData)

        getWorldJson().then((res) => {  // 获取json文件
        vaccineData. mapData = res.data;
          nextTick(() => {
            setTimeout(() => {
              let mapDom = echarts.init(
                document.getElementById("VaccineMap"),
                null,
                { renderer: "svg" }
              );
            //   mapDom.showLoading({ text: "正在加载数据" }); // 加载动画
              console.log(vaccineData.mapData);
              echarts.registerMap("world", vaccineData.mapData);
              mapDom.setOption(getMapOptions(vaccineData.countryData, world));
            //   mapDom.hideLoading(); // 隐藏加载动画
            mapDom.resize()
            }, 500);
            window.addEventListener('resize', () => {
            mapDom.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
          });
        });
      });
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

 
function getMapOptions(data, world) {
        let colorArea = [
          "#1480fa",
          "#499eff",
          "#73b4fd",
          "#a1ccfd",
          "#c8e1fd",
          "#ecf5ff",
        ];
        
        return {
          tooltip: {
            trigger: "item",
            textStyle: {
              color: "#FFF", // 文字的颜色
              fontSize: "11", // 文字字体大小
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
              return (
                params.name +
                "<br/>" +
                "累计接种人数 : " +
                setUnit(params.value) +
                "<br/>" +
                "每百人数接种 : " +
                params.data.count +
                " 剂"
              );
            },
          },
          visualMap: {
            type: "piecewise",
            splitNumber: 6,
            calculable: true,
            orient: "horizontal",
            dimension: 0,
            itemGap: 0,
            pieces: [
              // 自定义每一段的范围，以及每一段的文字
              { gte: 100000000, color: colorArea[0] }, // 不指定 max，表示 max 为无限大（Infinity）。
              { gte: 10000000, lte: 99999999, color: colorArea[1] },
              { gte: 1000000, lte: 9999999, color: colorArea[2] },
              { gte: 100000, lte: 999999, color: colorArea[3] },
              { gte: 11, lte: 99999, color: colorArea[4] },
              { lte: 10, color: colorArea[5] }, // 不指定 min，表示 min 为无限大（-Infinity）。
            ],
            realtime: false,
            color: colorArea,
            bottom: 5,
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
                    show: false,   //不显示国家名
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
</script>
  <style scoped>
  #VaccineMap {
    margin-top: 70px;
    width: 100%;
    height: 660px;
    background-color: transparent;
    /* margin-bottom: var(--marginB); */
  }
  </style>