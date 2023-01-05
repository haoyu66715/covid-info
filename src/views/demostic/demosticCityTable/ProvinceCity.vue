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
                        
                        :text="'中国各省市数据汇总'"
                    ></content-split>
                    <CityTable/>
                </el-main>
               
            </el-container>
        </el-container>
        
    </div>
    
    
</template>

<script setup>
import Container from '@/components/navigator/Container.vue'
import DomesticHeader from '@/components/navigator/DomesticHeader.vue'
import DomesticMain from '@/components/navigator/DomesticMain.vue'
import CityTable from './childs/CityTable.vue';
import Wait from '@/components/wait/Wait.vue';

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