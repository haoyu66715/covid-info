<template>
    <div class="common-layout" >
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
                        :text="'中国疫情分布图'"
                    ></content-split>
                     <DomesticMap :typeIndex='1'  />
                     <p>各省累计确诊人数</p>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
    
    
</template>

<script setup >
import Container from '@/components/navigator/Container.vue'
import DomesticHeader from '@/components/navigator/DomesticHeader.vue'
import DomesticMain from '@/components/navigator/DomesticMain.vue'
import DomesticMap from './childs/DomesticMap.vue'
import Wait from '@/components/wait/Wait.vue';
import {ref} from 'vue'
import { getDemosticDetail } from "@/api/demosticReport"; // 网络请求
import {useStore} from "vuex"


const flag = ref("true")

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
p{
    text-align: center;
    margin-top:15px ;
    font-size:20px
}
</style>