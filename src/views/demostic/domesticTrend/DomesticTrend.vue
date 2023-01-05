<template>
    <div class="common-layout">
        <Wait/>
        <el-container>
            <el-header class="domestic_header"><DomesticHeader/></el-header>
            <el-container>
                <Container/>
                <el-main class="domestic_main">
                     <DomesticMain/>
                     <content-split
                        class="split"
                        :btnText="'疫情地图'"
                        :text="'疫情趋势图'"
                    ></content-split>
                    <ChinaTrend/>
                    <ChinaNoinfect/>
                </el-main>
               
            </el-container>
        </el-container>
        
    </div>
    
    
</template>

<script setup >
import Container from '@/components/navigator/Container.vue'
import DomesticHeader from '@/components/navigator/DomesticHeader.vue'
import DomesticMain from '@/components/navigator/DomesticMain.vue'
import ChinaTrend from './childs/ChinaTrend.vue'
import ChinaNoinfect from './childs/ChinaNoinfect.vue'
import Wait from '@/components/wait/Wait.vue';
import {ref} from 'vue'





</script>

<style scoped>
.domestic_header{
  position: relative;
  height: 170px ;
  margin: 0;
  padding: 0;
}

.domestic_main {
  padding: 0;
  margin: 0;
}

.split{
    padding-left: 20px;
    padding-top:30px;
}
</style>