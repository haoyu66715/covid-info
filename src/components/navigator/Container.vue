<!-- 左边栏 -->
<template>    
      <el-aside  class="aside">
         <el-scrollbar class="scroll">
          <el-menu 
          router
          :default-openeds="['1','2','3','4']" 
          class="menu" 
          default-active="this.$router.path">
          <el-sub-menu index="1">
            <template #title>
              <el-icon class="eidomestic"> </el-icon>国内疫情
            </template>
            <el-menu-item-group>
              <el-menu-item index="/DomesticReport" >国内疫情分布</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="/DomesticTrend">国内疫情趋势表</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="/ProvinceCity">各省市数据汇总</el-menu-item>
              <el-divider></el-divider>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <el-icon class="eiglobal"></el-icon>全球疫情
            </template>
            <el-menu-item-group>
              <el-menu-item index="/GlobalReport">全球疫情信息分布情况</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="/ContinentSum">各大洲疫情累计确诊统计</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="/GlobalDetail">海外各国详情信息</el-menu-item>
              <el-divider></el-divider>
            </el-menu-item-group>
           
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon class="eivaccines"></el-icon>疫苗接种
            </template>
            <el-menu-item-group>
              <el-menu-item index="/GlobalVaccines">全球疫苗接种分布图</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="/VaccinesStatus">世界主要国家接种情况</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="/VaccinesInfo">世界各国疫苗信息</el-menu-item>
              <el-divider></el-divider>
            </el-menu-item-group>
          </el-sub-menu>
        <!-- <el-sub-menu index="4">
            <template #title>
              <el-icon class="eitools"></el-icon>服务平台
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">疫苗接种预约</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="4-2">世界疫苗动态</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="4-3">国内疫情速报</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="4-4">出行政策查询</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="4-5">核酸检测机构</el-menu-item>
              <el-divider></el-divider>
              <el-menu-item index="4-6">患者行程轨迹</el-menu-item>
              <el-divider></el-divider>
            </el-menu-item-group>
          </el-sub-menu> -->

        </el-menu>
        
      </el-scrollbar>
    </el-aside>
</template>






  


<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'


</script>

<style scoped>
 .el-divider--horizontal{
     margin: 2px 0;
     background: 0 0;
     
 } 

.el-menu-item{
    border: black;
}
.aside{
    width: 200px;
    height: 1000px;
}

.el-menu-item.is-active{
    background:#CAE1FF ;
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.eidomestic{
    height: 45%;
    background: url('@/assets/image/navbar/demosticActive.png') center center 
    no-repeat;
    background-size: cover;
    font-weight: 550 ;

}
.eiglobal{
    height: 45%;
    background: url('@/assets/image/navbar/globalActive.png') center center no-repeat;
    background-size: cover;
}
.eivaccines{
    height: 40%;
    background: url('@/assets/image/navbar/vaccinesActive.png') center center no-repeat;
    background-size: cover;
}
.eitools{
    height: 40%;
    background: url('@/assets/image/navbar/toolActive.png') center center no-repeat;
    background-size: cover;
}
.scroll{
    height: 100%;
     border-radius: 10px;
      background-color: #fff;
}

.container{
    height: 100%
}

.menu {
    height: 100%;
}

</style>
